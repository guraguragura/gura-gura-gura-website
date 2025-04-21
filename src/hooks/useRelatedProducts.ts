
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RelatedProduct {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  is_sale: boolean;
  is_new: boolean;
}

export function useRelatedProducts(productId: string) {
  const [products, setProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const { data, error: queryError } = await supabase
          .rpc('get_related_products', {
            current_product_id: productId
          });

        if (queryError) {
          throw queryError;
        }

        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Failed to load related products');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRelatedProducts();
    }
  }, [productId]);

  return { products, loading, error };
}
