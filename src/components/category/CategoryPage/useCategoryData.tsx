
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMedusaProducts } from "@/hooks/useMedusaProducts";

// Types
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  reviews_count: number;
  discount_price?: number;
  is_sale?: boolean;
  is_new?: boolean;
}

// Constants
const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const useCategoryData = (handle?: string) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch category info from Supabase
  useEffect(() => {
    const fetchCategory = async () => {
      if (!handle) return;
      
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('id, name, handle')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
        } else if (categoryData) {
          setCategoryName(categoryData.name);
          setCategoryId(categoryData.id);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchCategory();
  }, [handle]);

  // Fetch products using Medusa API
  const { products: medusaProducts, isLoading, error } = useMedusaProducts({
    category: categoryId,
  });

  // Sort and paginate products on the client side
  const { products, totalProducts } = useMemo(() => {
    let sortedProducts = [...medusaProducts];

    // Apply sorting
    switch (sortBy) {
      case "price_asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sortedProducts.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
        break;
      default:
        // popularity - keep original order from API
        break;
    }

    const total = sortedProducts.length;
    
    // Apply pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    return { products: paginatedProducts, totalProducts: total };
  }, [medusaProducts, sortBy, currentPage, productsPerPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return {
    products,
    loading: isLoading,
    categoryName,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalProducts,
    totalPages,
    productsPerPage,
    sortOptions
  };
};

export default useCategoryData;
export { sortOptions };
