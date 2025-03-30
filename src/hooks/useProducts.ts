
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define a flat structure with no circular references
export interface Product {
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
  is_featured: boolean;
  // Store original metadata for reference if needed
  raw_metadata?: Record<string, any>;
}

interface ProductOptions {
  category?: string;
  limit?: number;
  featured?: boolean;
  onSale?: boolean;
}

// Utility functions for safely extracting values
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
        // Use the any type for the query to avoid TypeScript's excessive type checking
        let query: any = supabase
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
          // Transform data to match our Product interface without circular references
          const formattedProducts = data.map(item => {
            // Get the raw metadata object safely
            const rawMetadata = typeof item.metadata === 'object' && item.metadata !== null 
              ? item.metadata 
              : {};
            
            // Extract all values we need
            const price = extractNumber(rawMetadata, 'price', 19.99);
            const discountPrice = extractNumber(rawMetadata, 'discount_price', 0);
            const images = extractArray<string>(rawMetadata, 'images', [item.thumbnail || "/placeholder.svg"]);
            const rating = extractNumber(rawMetadata, 'rating', 4.5);
            const reviewsCount = extractNumber(rawMetadata, 'reviews_count', 124);
            const isSale = extractBoolean(rawMetadata, 'is_sale', false);
            const isNew = extractBoolean(rawMetadata, 'is_new', false);
            const isFeatured = extractBoolean(rawMetadata, 'is_featured', false);
            
            // Build a completely flat product object
            const product: Product = {
              id: item.id,
              title: item.title,
              description: item.description || "",
              price: price,
              discount_price: discountPrice || undefined,
              thumbnail: item.thumbnail || "/placeholder.svg",
              images: images,
              rating: rating,
              reviews_count: reviewsCount,
              is_sale: isSale,
              is_new: isNew,
              is_featured: isFeatured,
              // Optionally keep the original metadata for reference
              raw_metadata: rawMetadata
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
