import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TagProduct {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  is_sale?: boolean;
  is_new?: boolean;
  tags?: string[];
}

export interface TagDataReturn {
  products: TagProduct[];
  isLoading: boolean;
  error: string | null;
  totalProducts: number;
}

export function useTagData(tagName: string): TagDataReturn {
  const [products, setProducts] = useState<TagProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (!tagName) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    const fetchTagProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Format tag value (e.g., "for-her" -> "For Her")
        const tagValue = tagName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        const query = supabase
          .from('product')
          .select(`
            *,
            product_tags(product_tag(id, value))
          `)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        const { data, error: queryError } = await query;

        if (queryError) {
          console.error('Error fetching tag products:', queryError);
          setError('Failed to load products');
          setProducts([]);
          setTotalProducts(0);
        } else if (data) {
          // Filter products by tag
          const filteredProducts = data.filter(item => {
            const productTags = Array.isArray(item.product_tags)
              ? item.product_tags
                  .map((pt: any) => pt?.product_tag?.value)
                  .filter((tag: string | undefined): tag is string => typeof tag === 'string')
              : [];
            return productTags.includes(tagValue);
          });

          // Transform to TagProduct format
          const formattedProducts = filteredProducts.map(item => {
            const rawMetadata = typeof item.metadata === 'object' && item.metadata !== null && !Array.isArray(item.metadata)
              ? item.metadata as Record<string, any>
              : {};

            const tags = Array.isArray(item.product_tags) 
              ? item.product_tags
                  .map((pt: any) => pt?.product_tag?.value)
                  .filter((tag: string | undefined): tag is string => typeof tag === 'string')
              : [];

            return {
              id: item.id,
              title: item.title,
              description: item.description || '',
              thumbnail: item.thumbnail || '/placeholder.svg',
              price: typeof rawMetadata['price'] === 'number' ? rawMetadata['price'] : 19.99,
              discount_price: typeof rawMetadata['discount_price'] === 'number' ? rawMetadata['discount_price'] : undefined,
              rating: typeof rawMetadata['rating'] === 'number' ? rawMetadata['rating'] : 4.5,
              reviews_count: typeof rawMetadata['reviews_count'] === 'number' ? rawMetadata['reviews_count'] : 0,
              is_sale: rawMetadata['is_sale'] === true || rawMetadata['is_sale'] === 'true',
              is_new: rawMetadata['is_new'] === true || rawMetadata['is_new'] === 'true',
              tags
            };
          });

          setProducts(formattedProducts);
          setTotalProducts(formattedProducts.length);
        }
      } catch (err) {
        console.error('Failed to fetch tag products:', err);
        setError('An unexpected error occurred');
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagProducts();
  }, [tagName]);

  return { products, isLoading, error, totalProducts };
}
