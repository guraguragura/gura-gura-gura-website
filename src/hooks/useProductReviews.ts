import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  user_name: string;
  user_avatar?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [summary, setSummary] = useState<ReviewSummary>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('product_reviews')
          .select(`
            id,
            product_id,
            user_id,
            rating,
            title,
            comment,
            verified_purchase,
            helpful_count,
            created_at,
            profiles!product_reviews_user_id_fkey (
              display_name,
              avatar_url
            )
          `)
          .eq('product_id', productId)
          .order('created_at', { ascending: false });

        if (reviewsError) {
          throw new Error(reviewsError.message);
        }

        // Transform data
        const transformedReviews: ProductReview[] = (reviewsData || []).map(review => ({
          id: review.id,
          product_id: review.product_id,
          user_id: review.user_id,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
          verified_purchase: review.verified_purchase,
          helpful_count: review.helpful_count,
          created_at: review.created_at,
          user_name: review.profiles?.display_name || 'Anonymous',
          user_avatar: review.profiles?.avatar_url
        }));

        setReviews(transformedReviews);

        // Calculate summary
        if (transformedReviews.length > 0) {
          const totalRating = transformedReviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / transformedReviews.length;
          
          const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          transformedReviews.forEach(review => {
            ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
          });

          setSummary({
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews: transformedReviews.length,
            ratingDistribution
          });
        }

      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch reviews"));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const submitReview = async (reviewData: {
    rating: number;
    title: string;
    comment: string;
    userId: string;
  }) => {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          user_id: reviewData.userId,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          verified_purchase: true // You might want to verify this based on actual purchases
        });

      if (error) {
        throw new Error(error.message);
      }

      // Refresh reviews after submission
      window.location.reload(); // Simple refresh, could be optimized
    } catch (err) {
      console.error("Error submitting review:", err);
      throw err;
    }
  };

  return { reviews, summary, loading, error, submitReview };
};