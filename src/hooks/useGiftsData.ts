import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GiftProduct {
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
  category?: string;
}

export interface GiftsDataReturn {
  products: GiftProduct[];
  isLoading: boolean;
  error: string | null;
  totalProducts: number;
}

export function useGiftsData(): GiftsDataReturn {
  const [products, setProducts] = useState<GiftProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchGiftsProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const query = supabase
          .from('product')
          .select(`
            *,
            product_tags(product_tag(id, value)),
            product_category_product(product_category_id, product_category:product_category(name, handle))
          `)
          .is('deleted_at', null)
          .order('created_at', { ascending: false });

        const { data, error: queryError } = await query;

        if (queryError) {
          console.error('Error fetching gifts products:', queryError);
          setError('Failed to load products');
          setProducts([]);
          setTotalProducts(0);
        } else if (data) {
          // Filter products that match our criteria
          const giftTags = ['For Her', 'For Him', 'For Kids'];
          const homeArtCategory = 'home-art';

          const filteredProducts = data.filter(item => {
            // Get product tags
            const productTags = Array.isArray(item.product_tags)
              ? item.product_tags
                  .map((pt: any) => pt?.product_tag?.value)
                  .filter((tag: string | undefined): tag is string => typeof tag === 'string')
              : [];

            // Check if product has any of the gift tags
            const hasGiftTag = giftTags.some(tag => productTags.includes(tag));

            // Get product category
            const productCategories = Array.isArray(item.product_category_product)
              ? item.product_category_product
                  .map((pc: any) => pc?.product_category?.handle)
                  .filter((handle: string | undefined): handle is string => typeof handle === 'string')
              : [];

            // Check if product is in Home & Art category
            const isHomeArt = productCategories.includes(homeArtCategory);

            return hasGiftTag || isHomeArt;
          });

          // Transform to GiftProduct format
          const formattedProducts = filteredProducts.map(item => {
            const rawMetadata = typeof item.metadata === 'object' && item.metadata !== null && !Array.isArray(item.metadata)
              ? item.metadata as Record<string, any>
              : {};

            const tags = Array.isArray(item.product_tags) 
              ? item.product_tags
                  .map((pt: any) => pt?.product_tag?.value)
                  .filter((tag: string | undefined): tag is string => typeof tag === 'string')
              : [];

            const categories = Array.isArray(item.product_category_product)
              ? item.product_category_product
                  .map((pc: any) => pc?.product_category?.name)
                  .filter((name: string | undefined): name is string => typeof name === 'string')
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
              tags,
              category: categories[0]
            };
          });

          setProducts(formattedProducts);
          setTotalProducts(formattedProducts.length);
        }
      } catch (err) {
        console.error('Failed to fetch gifts products:', err);
        setError('An unexpected error occurred');
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiftsProducts();
  }, []);

  return { products, isLoading, error, totalProducts };
}
