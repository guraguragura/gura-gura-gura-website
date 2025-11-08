import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/common";
import type { ProductFilters } from "@/components/category/filters/types";

const useCollectionData = (collectionHandle: string | undefined, filters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState<string>("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
  ];

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      if (!collectionHandle) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // First, get the collection by handle
        const { data: collection, error: collectionError } = await supabase
          .from("product_collection")
          .select("id, title, handle")
          .eq("handle", collectionHandle)
          .single();

        if (collectionError) {
          console.error('Collection error:', collectionError);
          throw collectionError;
        }
        if (!collection) {
          setLoading(false);
          return;
        }

        setCollectionName(collection.title);

        // For now, return empty - collections will be populated via Medusa admin
        const productIds: string[] = [];

        if (productIds.length === 0) {
          setProducts([]);
          setTotalProducts(0);
          setLoading(false);
          return;
        }

        // Fetch products
        let query = supabase
          .from("product")
          .select("*", { count: "exact" })
          .in("id", productIds)
          .eq("status", "published");

        // Apply filters
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
          const minPrice = filters.minPrice || 0;
          const maxPrice = filters.maxPrice || 1000000;
          query = query.gte("metadata->>price", minPrice).lte("metadata->>price", maxPrice);
        }

        if (filters.rating) {
          query = query.gte("metadata->>rating", filters.rating);
        }

        // Apply sorting
        switch (sortBy) {
          case "price-asc":
            query = query.order("metadata->>price", { ascending: true });
            break;
          case "price-desc":
            query = query.order("metadata->>price", { ascending: false });
            break;
          case "name-asc":
            query = query.order("title", { ascending: true });
            break;
          case "name-desc":
            query = query.order("title", { ascending: false });
            break;
          case "newest":
            query = query.order("created_at", { ascending: false });
            break;
          default:
            query = query.order("metadata->>is_featured", { ascending: false });
        }

        // Pagination
        const from = (currentPage - 1) * productsPerPage;
        const to = from + productsPerPage - 1;
        query = query.range(from, to);

        const { data: productsData, error: productsError, count } = await query;

        if (productsError) throw productsError;

        const formattedProducts: Product[] = (productsData || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description || '',
          thumbnail: p.thumbnail,
          price: parseFloat(p.metadata?.price || "0"),
          discount_price: p.metadata?.discount_price ? parseFloat(p.metadata.discount_price) : undefined,
          rating: parseFloat(p.metadata?.rating || "4.5"),
          reviews_count: parseInt(p.metadata?.reviews_count || "0"),
          is_sale: p.metadata?.is_sale === true,
          is_new: p.metadata?.is_new === true,
          is_featured: p.metadata?.is_featured === true,
          handle: p.handle,
          images: p.images || [],
          tags: []
        }));

        setProducts(formattedProducts);
        setTotalProducts(count || 0);
      } catch (error) {
        console.error("Error fetching collection products:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionProducts();
  }, [collectionHandle, filters, sortBy, currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return {
    products,
    loading,
    collectionName,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalProducts,
    totalPages,
    productsPerPage,
    sortOptions,
  };
};

export default useCollectionData;