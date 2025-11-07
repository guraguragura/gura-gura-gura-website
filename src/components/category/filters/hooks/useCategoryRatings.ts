import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface RatingOption {
  value: number;
  count: number;
}

export const useCategoryRatings = (handle?: string) => {
  const [ratings, setRatings] = useState<RatingOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        if (!handle) {
          setRatings([]);
          return;
        }

        // Get category id from handle
        const { data: category, error: categoryError } = await supabase
          .from('product_category')
          .select('id')
          .eq('handle', handle)
          .maybeSingle();

        if (categoryError) {
          console.error('[useCategoryRatings] Category fetch error:', categoryError);
          setRatings([]);
          return;
        }

        if (!category) {
          setRatings([]);
          return;
        }

        // Get product ids in this category
        const { data: productCategoryData, error: productCategoryError } = await supabase
          .from('product_category_product')
          .select('product_id')
          .eq('product_category_id', category.id);

        if (productCategoryError) {
          console.error('[useCategoryRatings] product_category_product fetch error:', productCategoryError);
          setRatings([]);
          return;
        }

        const productIds = (productCategoryData || []).map(pc => pc.product_id);
        if (productIds.length === 0) {
          setRatings([5,4,3,2,1].map(v => ({ value: v, count: 0 })));
          return;
        }

        // Fetch all reviews for those products
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('product_reviews')
          .select('product_id, rating')
          .in('product_id', productIds);

        if (reviewsError) {
          console.error('[useCategoryRatings] Reviews fetch error:', reviewsError);
          setRatings([5,4,3,2,1].map(v => ({ value: v, count: 0 })));
          return;
        }

        const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        (reviewsData || []).forEach(r => {
          if (r.rating >= 1 && r.rating <= 5) counts[r.rating] = (counts[r.rating] || 0) + 1;
        });

        const options: RatingOption[] = [5,4,3,2,1].map(v => ({ value: v, count: counts[v] || 0 }));
        setRatings(options);
      } catch (e) {
        console.error('[useCategoryRatings] Unexpected error:', e);
        setRatings([5,4,3,2,1].map(v => ({ value: v, count: 0 })));
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [handle]);

  return { ratings, loading };
};
