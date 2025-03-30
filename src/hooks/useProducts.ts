
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

// Type guard to check if a value is a plain object
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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
            // Extract metadata safely using explicit property checks
            const rawMetadata = item.metadata || {};
            
            // Create a fresh metadata object with strict typing
            const productMetadata: ProductMetadata = {};
            
            // Only add properties that exist and have correct types
            if (typeof rawMetadata.price === 'number') productMetadata.price = rawMetadata.price;
            if (typeof rawMetadata.discount_price === 'number') productMetadata.discount_price = rawMetadata.discount_price;
            if (Array.isArray(rawMetadata.images)) productMetadata.images = rawMetadata.images;
            if (typeof rawMetadata.rating === 'number') productMetadata.rating = rawMetadata.rating;
            if (typeof rawMetadata.reviews_count === 'number') productMetadata.reviews_count = rawMetadata.reviews_count;
            if (typeof rawMetadata.is_sale === 'boolean') productMetadata.is_sale = rawMetadata.is_sale;
            if (typeof rawMetadata.is_new === 'boolean') productMetadata.is_new = rawMetadata.is_new;
            if (typeof rawMetadata.is_featured === 'boolean') productMetadata.is_featured = rawMetadata.is_featured;
            
            // Build product with directly assigned properties, not referencing original metadata
            const product: Product = {
              id: item.id,
              title: item.title,
              description: item.description || "",
              price: typeof rawMetadata.price === 'number' ? rawMetadata.price : 19.99,
              discount_price: typeof rawMetadata.discount_price === 'number' ? rawMetadata.discount_price : undefined,
              thumbnail: item.thumbnail || "/placeholder.svg",
              images: Array.isArray(rawMetadata.images) ? rawMetadata.images : [item.thumbnail || "/placeholder.svg"],
              rating: typeof rawMetadata.rating === 'number' ? rawMetadata.rating : 4.5,
              reviews_count: typeof rawMetadata.reviews_count === 'number' ? rawMetadata.reviews_count : 124,
              is_sale: typeof rawMetadata.is_sale === 'boolean' ? rawMetadata.is_sale : false,
              is_new: typeof rawMetadata.is_new === 'boolean' ? rawMetadata.is_new : false,
              // Use our carefully constructed metadata object
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
