
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
  metadata?: Record<string, any>;
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
        // Build query
        let query = supabase
          .from('product')
          .select('*, product_category_product(product_category_id, product_category:product_category(name, handle))')
          .eq('deleted_at', null)
          .order('created_at', { ascending: false });
          
        // Apply filters
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
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching products:", error);
          setError("Failed to load products");
          setProducts([]);
        } else {
          // Transform data to match our Product interface
          const formattedProducts: Product[] = data.map(product => {
            // Ensure metadata is treated as a valid object or empty object if null/undefined
            const metadata = product.metadata && typeof product.metadata === 'object' ? product.metadata : {};
            
            // Helper function to safely get metadata values with type checking
            const getMetadataValue = <T,>(key: string, defaultValue: T): T => {
              if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
                return defaultValue;
              }
              
              const value = metadata[key];
              
              // Type-specific checks
              if (key === 'price' || key === 'discount_price' || key === 'rating' || key === 'reviews_count') {
                return (typeof value === 'number') ? value as T : defaultValue;
              } else if (key === 'images') {
                return (Array.isArray(value)) ? value as T : [product.thumbnail || "/placeholder.svg"] as unknown as T;
              } else if (key === 'is_sale' || key === 'is_new') {
                return (typeof value === 'boolean') ? value as T : defaultValue;
              }
              
              return (value !== undefined && value !== null) ? value as T : defaultValue;
            };
            
            return {
              id: product.id,
              title: product.title,
              description: product.description || "",
              price: getMetadataValue<number>('price', 19.99),
              discount_price: getMetadataValue<number | undefined>('discount_price', undefined),
              thumbnail: product.thumbnail || "/placeholder.svg",
              images: getMetadataValue<string[]>('images', [product.thumbnail || "/placeholder.svg"]),
              rating: getMetadataValue<number>('rating', 4.5),
              reviews_count: getMetadataValue<number>('reviews_count', 124),
              is_sale: getMetadataValue<boolean>('is_sale', false),
              is_new: getMetadataValue<boolean>('is_new', false),
              metadata
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
