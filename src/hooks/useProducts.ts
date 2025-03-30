
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
            // Extract metadata safely
            const metadata = product.metadata || {};
            
            // Create a new metadata object with only the fields we need
            const safeMetadata: SafeMetadata = {
              price: typeof metadata.price === 'number' ? metadata.price : undefined,
              discount_price: typeof metadata.discount_price === 'number' ? metadata.discount_price : undefined,
              images: Array.isArray(metadata.images) ? metadata.images : undefined,
              rating: typeof metadata.rating === 'number' ? metadata.rating : undefined,
              reviews_count: typeof metadata.reviews_count === 'number' ? metadata.reviews_count : undefined,
              is_sale: typeof metadata.is_sale === 'boolean' ? metadata.is_sale : undefined,
              is_new: typeof metadata.is_new === 'boolean' ? metadata.is_new : undefined,
              is_featured: typeof metadata.is_featured === 'boolean' ? metadata.is_featured : undefined,
            };
            
            return {
              id: product.id,
              title: product.title,
              description: product.description || "",
              price: typeof safeMetadata.price === 'number' ? safeMetadata.price : 19.99,
              discount_price: typeof safeMetadata.discount_price === 'number' ? safeMetadata.discount_price : undefined,
              thumbnail: product.thumbnail || "/placeholder.svg",
              images: Array.isArray(safeMetadata.images) ? safeMetadata.images : [product.thumbnail || "/placeholder.svg"],
              rating: typeof safeMetadata.rating === 'number' ? safeMetadata.rating : 4.5,
              reviews_count: typeof safeMetadata.reviews_count === 'number' ? safeMetadata.reviews_count : 124,
              is_sale: typeof safeMetadata.is_sale === 'boolean' ? safeMetadata.is_sale : false,
              is_new: typeof safeMetadata.is_new === 'boolean' ? safeMetadata.is_new : false,
              metadata: safeMetadata
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
