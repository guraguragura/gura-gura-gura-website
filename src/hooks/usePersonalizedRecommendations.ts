import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRecentlyViewed } from './useRecentlyViewed';
import { useWishlist } from '@/contexts/WishlistContext';

interface Product {
  id: string;
  title: string;
  handle: string;
  thumbnail: string;
  metadata?: {
    price?: number;
    discount_price?: number;
    category?: string;
    tags?: string[];
    brand?: string;
  };
  collection_id?: string;
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
        let recommendedProducts: Product[] = [];

        if (allExcluded.length === 0 || allCategories.length > 0) {
          const { data: products } = await supabase
            .from('product')
            .select('id, title, handle, thumbnail, metadata, collection_id')
            .not('id', 'in', `(${allExcluded.length > 0 ? allExcluded.join(',') : 'none'})`)
            .eq('status', 'published')
            .limit(limit * 2);

          if (products && products.length > 0) {
            // Filter products with valid metadata and price
            recommendedProducts = products.filter(p => 
              p.metadata && 
              typeof p.metadata === 'object' && 
              'price' in p.metadata
            ) as Product[];

            // Score and sort by relevance if we have category context
            if (allCategories.length > 0) {
              recommendedProducts = recommendedProducts.map(p => {
                let score = 0;
                const productCategory = p.metadata?.category;
                
                // Match categories
                if (productCategory && allCategories.includes(productCategory)) {
                  score += 3;
                }
                
                // Match tags
                const productTags = p.metadata?.tags || [];
                const allContextTags = Array.from(new Set([...Array.from(viewedTags), ...Array.from(wishlistTags)]));
                if (productTags.some(tag => allContextTags.includes(tag))) {
                  score += 2;
                }
                
                return { ...p, score };
              }).sort((a: any, b: any) => b.score - a.score);
            }
          }
        }

        // Fallback to trending/popular products if needed
        if (recommendedProducts.length < limit) {
          const { data: trendingProducts } = await supabase
            .from('product')
            .select('id, title, handle, thumbnail, metadata, collection_id')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(limit);

          if (trendingProducts) {
            const validTrending = trendingProducts.filter(p => 
              p.metadata && 
              typeof p.metadata === 'object' && 
              'price' in p.metadata
            ) as Product[];
            
            recommendedProducts = [...recommendedProducts, ...validTrending];
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
