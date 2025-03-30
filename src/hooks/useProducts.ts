
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define simple non-recursive interfaces
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

// Simplified extraction utilities using type assertion
function extractNumber(data: any, key: string, defaultValue: number): number {
  if (!data || typeof data !== 'object' || typeof data[key] !== 'number') {
    return defaultValue;
  }
  return data[key];
}

function extractBoolean(data: any, key: string, defaultValue: boolean): boolean {
  if (!data || typeof data !== 'object' || typeof data[key] !== 'boolean') {
    return defaultValue;
  }
  return data[key];
}

function extractArray<T>(data: any, key: string, defaultValue: T[]): T[] {
  if (!data || typeof data !== 'object' || !Array.isArray(data[key])) {
    return defaultValue;
  }
  return data[key];
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
            // Handle metadata safely
            const metadata = typeof item.metadata === 'object' && item.metadata !== null 
              ? item.metadata 
              : {};
            
            // Extract values safely
            const price = extractNumber(metadata, 'price', 19.99);
            const discountPrice = extractNumber(metadata, 'discount_price', 0);
            const images = extractArray<string>(metadata, 'images', [item.thumbnail || "/placeholder.svg"]);
            const rating = extractNumber(metadata, 'rating', 4.5);
            const reviewsCount = extractNumber(metadata, 'reviews_count', 124);
            const isSale = extractBoolean(metadata, 'is_sale', false);
            const isNew = extractBoolean(metadata, 'is_new', false);
            const isFeatured = extractBoolean(metadata, 'is_featured', false);
            
            // Build the product object directly
            return {
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
              metadata: {
                price,
                discount_price: discountPrice || undefined,
                images,
                rating,
                reviews_count: reviewsCount,
                is_sale: isSale,
                is_new: isNew,
                is_featured: isFeatured
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
