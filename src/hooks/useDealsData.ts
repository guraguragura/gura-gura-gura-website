import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ProductFilters } from "@/components/category/filters/types";
import type { Product } from "@/types/common";
import { normalizeImageUrl } from "@/lib/utils";

// Constants
const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const useDealsData = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchDealsProducts = async () => {
      setLoading(true);
      try {
        // First, get all products
        const { data: allProductsData, error: allProductsError } = await supabase
          .from('product')
          .select('id, product_tags(product_tag(id, value))')
          .is('deleted_at', null);

        if (allProductsError) {
          console.error("Error fetching products:", allProductsError);
          setLoading(false);
          return;
        }

        if (!allProductsData || allProductsData.length === 0) {
          setProducts([]);
          setTotalProducts(0);
          setLoading(false);
          return;
        }

        // Filter products that have "Sale" or "Hot deal" tags
        const productsWithDeals = allProductsData.filter(product => {
          const tags = Array.isArray((product as any).product_tags)
            ? (product as any).product_tags
                .map((pt: any) => pt?.product_tag?.value)
                .filter((tag: string | undefined): tag is string => typeof tag === 'string')
            : [];
          return tags.includes('Sale') || tags.includes('Hot deal');
        });

        // Extract unique product IDs
        let productIds = productsWithDeals.map(item => item.id);

        // Apply filters
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
              
              productIds = Array.from(matchingProducts);
            }
          }
        }
        
        // Apply metadata filters (Brand, Material, Type) and Price filter
        if (filters && Object.keys(filters).length > 0) {
          const metadataFilters = Object.entries(filters).filter(([key]) => 
            !['Size', 'Color', 'minPrice', 'maxPrice', 'minRating'].includes(key)
          );
          
          const needsMetadata = metadataFilters.length > 0 || filters.minPrice || filters.maxPrice;
          
          if (needsMetadata && productIds.length > 0) {
            const { data: productsWithMetadata } = await supabase
              .from('product')
              .select('id, metadata')
              .in('id', productIds);
            
            if (productsWithMetadata) {
              productIds = productsWithMetadata
                .filter(product => {
                  const metadata = (product.metadata as Record<string, any>) || {};
                  
                  // Apply metadata filters
                  const metadataMatch = metadataFilters.every(([key, value]) => 
                    metadata[key.toLowerCase()] === value
                  );
                  
                  // Apply price filter
                  let priceMatch = true;
                  if (filters.minPrice || filters.maxPrice) {
                    const price = metadata.price || 0;
                    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0;
                    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
                    priceMatch = price >= minPrice && price <= maxPrice;
                  }
                  
                  return metadataMatch && priceMatch;
                })
                .map(p => p.id);
            }
          }
        }
        
        // Apply rating filter before pagination
        if (filters?.minRating && productIds.length > 0) {
          const { data: reviewsData } = await supabase
            .from('product_reviews')
            .select('product_id, rating')
            .in('product_id', productIds);
          
          if (reviewsData && reviewsData.length > 0) {
            const productRatings: Record<string, number[]> = {};
            
            reviewsData.forEach(review => {
              if (!productRatings[review.product_id]) {
                productRatings[review.product_id] = [];
              }
              productRatings[review.product_id].push(review.rating);
            });
            
            const minRating = parseFloat(filters.minRating);
            productIds = productIds.filter(productId => {
              const ratings = productRatings[productId];
              if (!ratings || ratings.length === 0) return false;
              const avgRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
              return avgRating >= minRating;
            });
          } else {
            productIds = [];
          }
        }
        
        if (productIds.length === 0) {
          setProducts([]);
          setTotalProducts(0);
          setLoading(false);
          return;
        }
        
        // Update total count with filtered products
        const { count: filteredCount } = await supabase
          .from('product')
          .select('id', { count: 'exact' })
          .in('id', productIds);
        
        setTotalProducts(filteredCount || 0);
        
        let query = supabase
          .from('product')
          .select('id, title, description, thumbnail, metadata, product_tags(product_tag(id, value))')
          .in('id', productIds)
          .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);
        
        // Apply sort to the query
        switch (sortBy) {
          case "price_asc":
            query = query.order('(metadata->price)::numeric', { ascending: true });
            break;
          case "price_desc":
            query = query.order('(metadata->price)::numeric', { ascending: false });
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
          
          let formattedProducts = productsData.map(product => {
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
              description: product.description || undefined,
              thumbnail: normalizeImageUrl(product.thumbnail),
              price: metadataObj.price || 0,
              discount_price: metadataObj.discount_price,
              rating: productRating?.avg || 0,
              reviews_count: productRating?.count || 0,
              is_sale: metadataObj.is_sale || false,
              is_new: metadataObj.is_new || false,
              is_featured: metadataObj.is_featured || false,
              tags: tags.length > 0 ? tags : undefined,
            };
          });
          
          // Sort by rating if needed
          if (sortBy === "rating") {
            formattedProducts.sort((a, b) => b.rating - a.rating);
          }
          
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch deals products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealsProducts();
  }, [currentPage, sortBy, filters]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return {
    products,
    loading,
    categoryName: "Deals",
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

export default useDealsData;
export { sortOptions };
