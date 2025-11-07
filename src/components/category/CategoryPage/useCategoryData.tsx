
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/components/category/filters/types";

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
  tags?: string[];
}

// Constants
const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const useCategoryData = (handle?: string, filters?: ProductFilters) => {
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
            
            // Apply filters before fetching
            let filteredProductIds = productIds;
            
            // Filter by product options (Size, Color)
            if (filters && Object.keys(filters).length > 0) {
              const optionFilters = Object.entries(filters).filter(([key]) => 
                ['Size', 'Color'].includes(key)
              );
              
              if (optionFilters.length > 0) {
                const { data: variantData } = await supabase
                  .from('product_variant')
                  .select(`
                    product_id,
                    product_variant_option!inner(
                      option_value:product_option_value!inner(
                        value,
                        option:product_option!inner(title)
                      )
                    )
                  `)
                  .in('product_id', productIds);
                
                if (variantData) {
                  const matchingProducts = new Set<string>();
                  
                  variantData.forEach((variant: any) => {
                    const variantOptions = variant.product_variant_option || [];
                    const matches = optionFilters.every(([filterKey, filterValue]) => {
                      return variantOptions.some((vo: any) => 
                        vo.option_value?.option?.title === filterKey &&
                        vo.option_value?.value === filterValue
                      );
                    });
                    
                    if (matches) {
                      matchingProducts.add(variant.product_id);
                    }
                  });
                  
                  filteredProductIds = Array.from(matchingProducts);
                }
              }
            }
            
            // Apply metadata filters (Brand, Material, Type)
            if (filters && Object.keys(filters).length > 0) {
              const metadataFilters = Object.entries(filters).filter(([key]) => 
                !['Size', 'Color'].includes(key)
              );
              
              if (metadataFilters.length > 0 && filteredProductIds.length > 0) {
                const { data: productsWithMetadata } = await supabase
                  .from('product')
                  .select('id, metadata')
                  .in('id', filteredProductIds);
                
                if (productsWithMetadata) {
                  filteredProductIds = productsWithMetadata
                    .filter(product => {
                      const metadata = (product.metadata as Record<string, any>) || {};
                      return metadataFilters.every(([key, value]) => 
                        metadata[key.toLowerCase()] === value
                      );
                    })
                    .map(p => p.id);
                }
              }
            }
            
            if (filteredProductIds.length === 0) {
              setProducts([]);
              setTotalProducts(0);
              setLoading(false);
              return;
            }
            
            // Update total count with filtered products
            const { count: filteredCount } = await supabase
              .from('product')
              .select('id', { count: 'exact' })
              .in('id', filteredProductIds);
            
            setTotalProducts(filteredCount || 0);
            
            let query = supabase
              .from('product')
              .select('id, title, description, thumbnail, metadata, product_tags(product_tag(id, value))')
              .in('id', filteredProductIds)
              .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);
              
            switch (sortBy) {
              case "price_asc":
                query = query.order('metadata->price', { ascending: true });
                break;
              case "price_desc":
                query = query.order('metadata->price', { ascending: false });
                break;
              case "rating":
                // We'll sort in memory after fetching reviews
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
              // Fetch reviews for all products
              const { data: reviewsData } = await supabase
                .from('product_reviews')
                .select('product_id, rating')
                .in('product_id', productsData.map(p => p.id));

              // Calculate ratings per product
              const ratingsMap = new Map<string, { avg: number; count: number }>();
              
              if (reviewsData && reviewsData.length > 0) {
                const productRatings: Record<string, number[]> = {};
                
                reviewsData.forEach(review => {
                  if (!productRatings[review.product_id]) {
                    productRatings[review.product_id] = [];
                  }
                  productRatings[review.product_id].push(review.rating);
                });
                
                Object.entries(productRatings).forEach(([productId, ratings]) => {
                  const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
                  ratingsMap.set(productId, { avg, count: ratings.length });
                });
              }
              
              const formattedProducts = productsData.map(product => {
                const metadataObj = product.metadata as Record<string, any> || {};
                const productRating = ratingsMap.get(product.id);
                
                // Extract tags from the joined data
                const tags = Array.isArray((product as any).product_tags) 
                  ? (product as any).product_tags
                      .map((pt: any) => pt?.product_tag?.value)
                      .filter((tag: string | undefined): tag is string => typeof tag === 'string')
                  : [];
                
                return {
                  id: product.id,
                  title: product.title,
                  description: product.description || "",
                  thumbnail: product.thumbnail || "/placeholder.svg",
                  price: metadataObj.price || 0,
                  discount_price: metadataObj.discount_price,
                  rating: productRating?.avg || 0,
                  reviews_count: productRating?.count || 0,
                  is_sale: metadataObj.is_sale || false,
                  is_new: metadataObj.is_new || false,
                  tags: tags.length > 0 ? tags : undefined,
                };
              });
              
              // Sort by rating if needed
              if (sortBy === "rating") {
                formattedProducts.sort((a, b) => b.rating - a.rating);
              }
              
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
  }, [handle, currentPage, sortBy, filters]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return {
    products,
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
