
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define strict interfaces without index signatures or recursive types
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

// Generic type-safe extraction utility
function safeExtract<T>(obj: unknown, key: string, defaultValue: T): T {
  if (!obj || typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  
  const value = (obj as Record<string, unknown>)[key];
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return value as T;
}

// Type-specific extraction utilities
function safeExtractNumber(obj: unknown, key: string, defaultValue: number): number {
  const value = safeExtract<unknown>(obj, key, null);
  return typeof value === 'number' ? value : defaultValue;
}

function safeExtractArray<T>(obj: unknown, key: string, defaultValue: T[]): T[] {
  const value = safeExtract<unknown>(obj, key, null);
  return Array.isArray(value) ? value : defaultValue;
}

function safeExtractBoolean(obj: unknown, key: string, defaultValue: boolean): boolean {
  const value = safeExtract<unknown>(obj, key, null);
  return typeof value === 'boolean' ? value : defaultValue;
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
            // Ensure metadata is an object
            const metadata = typeof item.metadata === 'object' && item.metadata !== null 
              ? item.metadata as Record<string, unknown>
              : {};
            
            // Extract values safely
            const price = safeExtractNumber(metadata, 'price', 19.99);
            const discountPrice = safeExtractNumber(metadata, 'discount_price', 0);
            const images = safeExtractArray<string>(metadata, 'images', [item.thumbnail || "/placeholder.svg"]);
            const rating = safeExtractNumber(metadata, 'rating', 4.5);
            const reviewsCount = safeExtractNumber(metadata, 'reviews_count', 124);
            const isSale = safeExtractBoolean(metadata, 'is_sale', false);
            const isNew = safeExtractBoolean(metadata, 'is_new', false);
            const isFeatured = safeExtractBoolean(metadata, 'is_featured', false);
            
            // Create a safe ProductMetadata object
            const productMetadata: ProductMetadata = {
              price,
              discount_price: discountPrice || undefined,
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
              discount_price: discountPrice || undefined,
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
