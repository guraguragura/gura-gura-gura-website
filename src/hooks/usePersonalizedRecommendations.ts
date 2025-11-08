import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRecentlyViewed } from './useRecentlyViewed';
import { useWishlist } from '@/contexts/WishlistContext';

interface Product {
  id: string;
  title: string;
  handle: string;
  thumbnail: string;
  variants: Array<{
    id: string;
    calculated_price?: {
      calculated_amount: number;
      currency_code: string;
    };
  }>;
  tags?: Array<{ value: string }>;
  categories?: Array<{ id: string; name: string }>;
}

interface RecommendationOptions {
  limit?: number;
  excludeProductIds?: string[];
  currentProductId?: string;
}

export const usePersonalizedRecommendations = (options: RecommendationOptions = {}) => {
  const { limit = 8, excludeProductIds = [], currentProductId } = options;
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useRecentlyViewed();
  const { wishlist: wishlistItems } = useWishlist();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const allExcluded = [
          ...excludeProductIds,
          ...(currentProductId ? [currentProductId] : []),
          ...recentlyViewed.map(p => p.id),
        ];

        // Gather context from browsing history and wishlist
        const viewedTags = new Set<string>();
        const viewedCategories = new Set<string>();
        const wishlistTags = new Set<string>();
        const wishlistCategories = new Set<string>();

        // Extract categories from recently viewed
        recentlyViewed.forEach(product => {
          if (product.category) {
            viewedCategories.add(product.category);
          }
        });

        // Extract categories from wishlist
        wishlistItems.forEach(item => {
          if (item.category) {
            wishlistCategories.add(item.category);
          }
        });

        const allCategories = [...viewedCategories, ...wishlistCategories];

        // Fetch recommendations based on categories
        let recommendedProducts: any[] = [];

        if (allExcluded.length === 0 || allCategories.length > 0) {
          const { data: products } = await supabase
            .from('product')
            .select(`
              id,
              title,
              handle,
              thumbnail,
              collection_id,
              variants:product_variant!inner(
                id,
                prices:price(
                  amount,
                  currency_code
                )
              )
            `)
            .not('id', 'in', `(${allExcluded.length > 0 ? allExcluded.join(',') : 'none'})`)
            .eq('status', 'published')
            .limit(limit * 2);

          if (products && products.length > 0) {
            recommendedProducts = products.map(p => ({
              ...p,
              variants: p.variants.map((v: any) => ({
                id: v.id,
                calculated_price: v.prices?.[0] ? {
                  calculated_amount: v.prices[0].amount,
                  currency_code: v.prices[0].currency_code
                } : undefined
              }))
            }));
          }
        }

        // Fallback to trending/popular products if needed
        if (recommendedProducts.length < limit) {
          const { data: trendingProducts } = await supabase
            .from('product')
            .select(`
              id,
              title,
              handle,
              thumbnail,
              collection_id,
              variants:product_variant!inner(
                id,
                prices:price(
                  amount,
                  currency_code
                )
              )
            `)
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(limit);

          if (trendingProducts) {
            const formattedTrending = trendingProducts.map(p => ({
              ...p,
              variants: p.variants.map((v: any) => ({
                id: v.id,
                calculated_price: v.prices?.[0] ? {
                  calculated_amount: v.prices[0].amount,
                  currency_code: v.prices[0].currency_code
                } : undefined
              }))
            }));
            recommendedProducts = [...recommendedProducts, ...formattedTrending];
          }
        }

        // Remove duplicates and limit
        const uniqueRecommendations = Array.from(
          new Map(recommendedProducts.map(p => [p.id, p])).values()
        ).slice(0, limit);

        setRecommendations(uniqueRecommendations);
      } catch (error) {
        console.error('Error fetching personalized recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [limit, recentlyViewed.length, wishlistItems.length, currentProductId]);

  return { recommendations, loading };
};
