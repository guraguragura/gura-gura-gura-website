
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define strict interfaces without index signatures
interface ProductMetadata {
  price?: number;
  discount_price?: number;
  images?: string[];
  rating?: number;
  reviews_count?: number;
  is_sale?: boolean;
  is_new?: boolean;
  is_featured?: boolean;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews_count: number;
  is_sale: boolean;
  is_new: boolean;
  metadata: ProductMetadata;
}

interface ProductOptions {
  category?: string;
  limit?: number;
  featured?: boolean;
  onSale?: boolean;
}

/**
 * Safely extracts a value from a JSON object with type checking
 * @param obj The object to extract from
 * @param key The key to extract
 * @param type The expected type
 * @param defaultValue Default value if key doesn't exist or type doesn't match
 */
function safeExtract<T>(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  type: string, 
  defaultValue: T
): T {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (value === undefined || value === null || typeof value !== type) {
    return defaultValue;
  }
  
  return value as T;
}

/**
 * Safely extracts an array from a JSON object
 * @param obj The object to extract from
 * @param key The key to extract
 * @param defaultValue Default value if key doesn't exist or is not an array
 */
function safeExtractArray<T>(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  defaultValue: T[]
): T[] {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (!Array.isArray(value)) {
    return defaultValue;
  }
  
  return value as T[];
}

/**
 * Safely extracts a boolean from a JSON object
 * @param obj The object to extract from
 * @param key The key to extract
 * @param defaultValue Default value if key doesn't exist or is not a boolean
 */
function safeExtractBoolean(
  obj: Record<string, unknown> | null | undefined, 
  key: string, 
  defaultValue: boolean
): boolean {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = obj[key];
  if (typeof value !== 'boolean') {
    return defaultValue;
  }
  
  return value;
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
          const formattedProducts: Product[] = data.map(item => {
            // First, ensure metadata is an object
            const rawMetadata = (typeof item.metadata === 'object' && item.metadata !== null) 
              ? item.metadata as Record<string, unknown>
              : {};
            
            // Extract values safely with type checking
            const price = safeExtract(rawMetadata, 'price', 'number', 19.99);
            const discountPrice = safeExtract(rawMetadata, 'discount_price', 'number', undefined);
            const images = safeExtractArray(rawMetadata, 'images', [item.thumbnail || "/placeholder.svg"]);
            const rating = safeExtract(rawMetadata, 'rating', 'number', 4.5);
            const reviewsCount = safeExtract(rawMetadata, 'reviews_count', 'number', 124);
            const isSale = safeExtractBoolean(rawMetadata, 'is_sale', false);
            const isNew = safeExtractBoolean(rawMetadata, 'is_new', false);
            const isFeatured = safeExtractBoolean(rawMetadata, 'is_featured', false);
            
            // Create a safe ProductMetadata object
            const productMetadata: ProductMetadata = {
              price,
              discount_price: discountPrice,
              images,
              rating,
              reviews_count: reviewsCount,
              is_sale: isSale,
              is_new: isNew,
              is_featured: isFeatured
            };
            
            // Build product with directly assigned properties
            const product: Product = {
              id: item.id,
              title: item.title,
              description: item.description || "",
              price,
              discount_price: discountPrice,
              thumbnail: item.thumbnail || "/placeholder.svg",
              images,
              rating,
              reviews_count: reviewsCount,
              is_sale: isSale,
              is_new: isNew,
              metadata: productMetadata
            };
            
            return product;
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
