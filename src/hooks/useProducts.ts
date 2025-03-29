
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  metadata?: Record<string, unknown>;
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
            // Use type assertion for metadata with proper checks
            const metadata = product.metadata as Record<string, unknown> || {};
            
            return {
              id: product.id,
              title: product.title,
              description: product.description || "",
              price: typeof metadata.price === 'number' ? metadata.price : 19.99,
              discount_price: typeof metadata.discount_price === 'number' ? metadata.discount_price : undefined,
              thumbnail: product.thumbnail || "/placeholder.svg",
              images: Array.isArray(metadata.images) ? metadata.images : [product.thumbnail || "/placeholder.svg"],
              rating: typeof metadata.rating === 'number' ? metadata.rating : 4.5,
              reviews_count: typeof metadata.reviews_count === 'number' ? metadata.reviews_count : 124,
              is_sale: typeof metadata.is_sale === 'boolean' ? metadata.is_sale : false,
              is_new: typeof metadata.is_new === 'boolean' ? metadata.is_new : false,
              metadata: product.metadata && typeof product.metadata === 'object' && !Array.isArray(product.metadata) 
                ? product.metadata as Record<string, unknown>
                : {}
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
