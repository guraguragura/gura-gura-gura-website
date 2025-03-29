
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
  metadata?: any;
}

export function useProducts(options: {
  category?: string;
  limit?: number;
  featured?: boolean;
  onSale?: boolean;
} = {}) {
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
            const metadata = product.metadata || {};
            return {
              id: product.id,
              title: product.title,
              description: product.description || "",
              price: typeof metadata === 'object' && metadata !== null ? (metadata.price || 19.99) : 19.99,
              discount_price: typeof metadata === 'object' && metadata !== null ? metadata.discount_price : undefined,
              thumbnail: product.thumbnail || "/placeholder.svg",
              images: typeof metadata === 'object' && metadata !== null ? (metadata.images || [product.thumbnail || "/placeholder.svg"]) : [product.thumbnail || "/placeholder.svg"],
              rating: typeof metadata === 'object' && metadata !== null ? (metadata.rating || 4.5) : 4.5,
              reviews_count: typeof metadata === 'object' && metadata !== null ? (metadata.reviews_count || 124) : 124,
              is_sale: typeof metadata === 'object' && metadata !== null ? (metadata.is_sale || false) : false,
              is_new: typeof metadata === 'object' && metadata !== null ? (metadata.is_new || false) : false,
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
