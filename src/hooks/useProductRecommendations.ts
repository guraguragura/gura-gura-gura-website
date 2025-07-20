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
        // Get current product details
        const { data: currentProduct, error: productError } = await supabase
          .from('product')
          .select('category, brand, price')
          .eq('id', productId)
          .single();

        if (productError) {
          throw new Error(productError.message);
        }

        // Fetch recommendations based on:
        // 1. Same category (50% weight)
        // 2. Same brand (30% weight)  
        // 3. Similar price range (20% weight)
        let query = supabase
          .from('product')
          .select('id, title, price, discount_price, thumbnail, rating, handle, category, brand')
          .neq('id', productId)
          .limit(12);

        // Prioritize same category
        if (currentProduct.category) {
          query = query.eq('category', currentProduct.category);
        }

        const { data: categoryProducts, error: categoryError } = await query;
        
        if (categoryError) {
          throw new Error(categoryError.message);
        }

        // If we don't have enough from same category, get from similar price range
        let allRecommendations = categoryProducts || [];

        if (allRecommendations.length < 8) {
          const priceRange = currentProduct.price * 0.3; // 30% price tolerance
          const { data: priceProducts } = await supabase
            .from('product')
            .select('id, title, price, discount_price, thumbnail, rating, handle, category, brand')
            .neq('id', productId)
            .gte('price', currentProduct.price - priceRange)
            .lte('price', currentProduct.price + priceRange)
            .limit(8);

          // Merge and deduplicate
          const existingIds = new Set(allRecommendations.map(p => p.id));
          const newProducts = (priceProducts || []).filter(p => !existingIds.has(p.id));
          allRecommendations = [...allRecommendations, ...newProducts];
        }

        // Sort by relevance score
        const scoredProducts = allRecommendations.map(product => {
          let score = 0;
          
          // Same category bonus
          if (product.category === currentProduct.category) score += 50;
          
          // Same brand bonus
          if (product.brand === currentProduct.brand) score += 30;
          
          // Price similarity bonus
          const priceDiff = Math.abs(product.price - currentProduct.price);
          const priceScore = Math.max(0, 20 - (priceDiff / currentProduct.price) * 20);
          score += priceScore;

          // Rating bonus
          score += product.rating * 2;

          return { ...product, relevanceScore: score };
        });

        // Sort by score and take top 8
        const sortedRecommendations = scoredProducts
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 8);

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