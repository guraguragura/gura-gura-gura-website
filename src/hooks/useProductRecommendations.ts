import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface RecommendedProduct {
  id: string;
  title: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  rating: number;
  handle: string;
  category?: string;
  brand?: string;
  is_sale?: boolean;
  is_new?: boolean;
  reviews_count?: number;
}

export const useProductRecommendations = (productId?: string, userId?: string) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First, get the current product details
        const { data: currentProduct, error: currentError } = await supabase
          .from('product')
          .select('id, title, thumbnail, handle, metadata, status')
          .eq('id', productId)
          .eq('status', 'published')
          .single();
        
        if (currentError) {
          throw new Error(currentError.message);
        }
        
        if (!currentProduct) return;
        
        const currentMetadata = (currentProduct.metadata as any) || {};
        const currentPrice = Number(currentMetadata.price) || 0;
        const currentCategory = currentMetadata.category || '';
        const currentBrand = currentMetadata.brand || '';
        
        // Get all published products except current one
        const { data: allProducts, error: productsError } = await supabase
          .from('product')
          .select('id, title, thumbnail, handle, metadata, status')
          .eq('status', 'published')
          .neq('id', productId)
          .limit(50);
        
        if (productsError) {
          throw new Error(productsError.message);
        }
        
        if (!allProducts) return;
        
        // Fetch reviews for all products
        const productIds = allProducts.map(p => p.id);
        const { data: reviewsData } = await supabase
          .from('product_reviews')
          .select('product_id, rating')
          .in('product_id', productIds);

        // Calculate ratings per product
        const ratingsMap = new Map<string, { avg: number; count: number }>();
        
        if (reviewsData && reviewsData.length > 0) {
          const productRatings: Record<string, number[]> = {};
          
          reviewsData.forEach(review => {
            if (!productRatings[review.product_id]) {
              productRatings[review.product_id] = [];
            }
            productRatings[review.product_id].push(review.rating);
          });
          
          Object.entries(productRatings).forEach(([productId, ratings]) => {
            const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
            ratingsMap.set(productId, { avg, count: ratings.length });
          });
        }
        
        // Transform and filter products
        const transformedProducts = allProducts.map(product => {
          const metadata = (product.metadata as any) || {};
          const productRating = ratingsMap.get(product.id);
          
          return {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail || '',
            price: Number(metadata.price) || 0,
            discount_price: metadata.discount_price ? Number(metadata.discount_price) : undefined,
            rating: productRating?.avg || 0,
            reviews_count: productRating?.count || 0,
            is_sale: Boolean(metadata.is_sale),
            is_new: Boolean(metadata.is_new),
            handle: product.handle,
            category: metadata.category || '',
            brand: metadata.brand || ''
          };
        });
        
        // Calculate relevance score and sort
        const scoredRecommendations = transformedProducts.map(product => {
          let score = 0;
          
          // Category match (highest priority)
          if (product.category === currentCategory) score += 40;
          
          // Brand match
          if (product.brand === currentBrand) score += 25;
          
          // Price similarity (closer price = higher score)
          if (currentPrice > 0) {
            const priceDiff = Math.abs(product.price - currentPrice);
            const priceScore = Math.max(0, 20 - (priceDiff / currentPrice) * 20);
            score += priceScore;
          }
          
          // Rating bonus (only if product has reviews)
          if (product.rating > 0) {
            score += product.rating * 3;
          }
          
          return {
            ...product,
            relevanceScore: score
          };
        });
        
        // Sort by relevance score and take top 8
        const sortedRecommendations = scoredRecommendations
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 8)
          .map(({ relevanceScore, ...product }) => product);
        
        setRecommendations(sortedRecommendations);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch recommendations"));
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId, userId]);

  return { recommendations, loading, error };
};