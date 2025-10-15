
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('name')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
        } else if (categoryData) {
          setCategoryName(categoryData.name);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('id')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching category id:", categoryError);
          setLoading(false);
          return;
        }

        if (categoryData) {
          const { data: productCategoryData, error: productCategoryError } = await supabase
            .from('product_category_product')
            .select('product_id')
            .eq('product_category_id', categoryData.id);

          if (productCategoryError) {
            console.error("Error fetching product categories:", productCategoryError);
            setLoading(false);
            return;
          }

          if (productCategoryData && productCategoryData.length > 0) {
            const productIds = productCategoryData.map(item => item.product_id);
            
            const { count, error: countError } = await supabase
              .from('product')
              .select('id', { count: 'exact' })
              .in('id', productIds);
              
            if (countError) {
              console.error("Error counting products:", countError);
            } else {
              setTotalProducts(count || 0);
            }
            
            let query = supabase
              .from('product')
              .select('id, title, description, thumbnail, metadata')
              .in('id', productIds)
              .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);
              
            switch (sortBy) {
              case "price_asc":
                query = query.order('metadata->price', { ascending: true });
                break;
              case "price_desc":
                query = query.order('metadata->price', { ascending: false });
                break;
              case "rating":
                query = query.order('metadata->rating', { ascending: false });
                break;
              case "newest":
                query = query.order('created_at', { ascending: false });
                break;
              default:
                query = query.order('metadata->popularity', { ascending: false });
            }
              
            const { data: productsData, error: productsError } = await query;
              
            if (productsError) {
              console.error("Error fetching products:", productsError);
            } else if (productsData) {
              const formattedProducts = productsData.map(product => {
                const metadataObj = product.metadata as Record<string, any> || {};
                
                return {
                  id: product.id,
                  title: product.title,
                  description: product.description || "",
                  thumbnail: product.thumbnail || "/placeholder.svg",
                  price: metadataObj.price || 0,
                  discount_price: metadataObj.discount_price,
                  rating: metadataObj.rating || 0,
                  reviews_count: metadataObj.reviews_count || 0,
                  is_sale: metadataObj.is_sale || false,
                  is_new: metadataObj.is_new || false,
                };
              });
              
              setProducts(formattedProducts);
            }
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchCategory();
      fetchProducts();
    }
  }, [handle, currentPage, sortBy]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return {
    products: products,
    loading,
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
