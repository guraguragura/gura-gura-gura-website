
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MedusaProduct {
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
  raw_metadata?: Record<string, any>;
}

interface ProductOptions {
  category?: string;
  limit?: number;
  featured?: boolean;
  onSale?: boolean;
  new?: boolean;
}

export function useMedusaProducts(options: ProductOptions = {}) {
  const [products, setProducts] = useState<MedusaProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        
        
        // Build query parameters
        const params = new URLSearchParams();
        
        if (options.category) params.append('category', options.category);
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.featured) params.append('featured', 'true');
        if (options.onSale) params.append('onSale', 'true');
        if (options.new) params.append('new', 'true');
        
        // Call Medusa products edge function
        const { data, error: functionError } = await supabase.functions.invoke('medusa-products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null
        });
        
        if (functionError) {
          console.error("Error calling medusa-products function:", functionError);
          throw new Error(functionError.message || 'Failed to fetch products');
        }
        
        
        
        if (data.error) {
          console.error("Medusa API error:", data.error);
          setError(data.error);
          setProducts([]);
        } else {
          setProducts(data.products || []);
          
        }
        
      } catch (err) {
        console.error("Failed to fetch products from Medusa:", err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.limit, options.featured, options.onSale, options.new]);

  return { products, isLoading, error };
}
