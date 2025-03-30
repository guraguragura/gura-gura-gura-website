
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define a more explicit type for metadata without index signature to avoid deep type recursion
type SafeMetadata = {
  price?: number;
  discount_price?: number;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  is_sale?: boolean;
  is_new?: boolean;
  is_featured?: boolean;
  // No index signature to prevent excessive type recursion
};

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  is_sale?: boolean;
  is_new?: boolean;
  metadata?: SafeMetadata;
}

// Define specific options type to avoid deep nesting issues
interface ProductOptions {
  category?: string;
  limit?: number;
  featured?: boolean;
  onSale?: boolean;
}

export function useProducts(options: ProductOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Build our base query
        let query = supabase
          .from('product')
          .select('*, product_category_product(product_category_id, product_category:product_category(name, handle))')
          .eq('deleted_at', null)
          .order('created_at', { ascending: false });
        
        // Apply individual filters
        if (options.category) {
          query = query.eq('product_category_product.product_category.handle', options.category);
        }
        
        if (options.featured) {
          query = query.eq('metadata->is_featured', true);
        }
        
        if (options.onSale) {
          query = query.not('metadata->discount_price', 'is', null);
        }
        
        if (options.limit) {
          query = query.limit(options.limit);
        }
        
        // Execute the query
        const { data, error: queryError } = await query;
        
        if (queryError) {
          console.error("Error fetching products:", queryError);
          setError("Failed to load products");
          setProducts([]);
        } else if (data) {
          // Transform data to match our Product interface
          const formattedProducts: Product[] = data.map(product => {
            // Ensure metadata is a valid object before extracting properties
            const rawMetadata = product.metadata;
            const metadataObj = typeof rawMetadata === 'object' && rawMetadata !== null ? rawMetadata : {};
            
            // Extract metadata properties with proper type checking
            const price = typeof metadataObj.price === 'number' ? metadataObj.price : 19.99;
            const discount_price = typeof metadataObj.discount_price === 'number' ? metadataObj.discount_price : undefined;
            const images = Array.isArray(metadataObj.images) ? metadataObj.images : [product.thumbnail || "/placeholder.svg"];
            const rating = typeof metadataObj.rating === 'number' ? metadataObj.rating : 4.5;
            const reviews_count = typeof metadataObj.reviews_count === 'number' ? metadataObj.reviews_count : 124;
            const is_sale = typeof metadataObj.is_sale === 'boolean' ? metadataObj.is_sale : false;
            const is_new = typeof metadataObj.is_new === 'boolean' ? metadataObj.is_new : false;
            const is_featured = typeof metadataObj.is_featured === 'boolean' ? metadataObj.is_featured : undefined;
            
            // Assemble the Product object with proper typing
            return {
              id: product.id,
              title: product.title,
              description: product.description || "",
              price,
              discount_price,
              thumbnail: product.thumbnail || "/placeholder.svg",
              images,
              rating,
              reviews_count,
              is_sale,
              is_new,
              metadata: {
                price: typeof metadataObj.price === 'number' ? metadataObj.price : undefined,
                discount_price,
                images: Array.isArray(metadataObj.images) ? metadataObj.images : undefined,
                rating,
                reviews_count,
                is_sale,
                is_new,
                is_featured
              }
            };
          });
          
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("An unexpected error occurred");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.limit, options.featured, options.onSale]);

  return { products, isLoading, error };
}
