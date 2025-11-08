import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PriceRange {
  min: number;
  max: number;
  loading: boolean;
}

export const useCategoryPriceRange = (categoryHandle?: string): PriceRange => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100, loading: true });

  useEffect(() => {
    const fetchPriceRange = async () => {
      if (!categoryHandle) {
        setPriceRange({ min: 0, max: 100, loading: false });
        return;
      }

      try {
        // Get category ID from handle
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('id')
          .eq('handle', categoryHandle)
          .single();

        if (categoryError || !categoryData) {
          setPriceRange({ min: 0, max: 100, loading: false });
          return;
        }

        // Get product IDs in this category
        const { data: categoryProducts, error: categoryProductsError } = await supabase
          .from('product_category_product')
          .select('product_id')
          .eq('product_category_id', categoryData.id);

        if (categoryProductsError || !categoryProducts || categoryProducts.length === 0) {
          setPriceRange({ min: 0, max: 100, loading: false });
          return;
        }

        const productIds = categoryProducts.map(cp => cp.product_id);

        // Get price range from products (using metadata price field)
        const { data: products, error: productsError } = await supabase
          .from('product')
          .select('metadata')
          .in('id', productIds);

        if (productsError || !products || products.length === 0) {
          setPriceRange({ min: 0, max: 100, loading: false });
          return;
        }

        const prices = products
          .map(p => {
            const metadata = p.metadata as { price?: number } | null;
            return metadata?.price;
          })
          .filter((price): price is number => price !== null && price !== undefined);

        if (prices.length === 0) {
          setPriceRange({ min: 0, max: 100, loading: false });
          return;
        }

        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));

        setPriceRange({
          min: minPrice,
          max: maxPrice,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching price range:', error);
        setPriceRange({ min: 0, max: 100, loading: false });
      }
    };

    fetchPriceRange();
  }, [categoryHandle]);

  return priceRange;
};
