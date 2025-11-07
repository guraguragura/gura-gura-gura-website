import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface OptionValue {
  value: string;
  count: number;
}

export interface ProductOptions {
  [optionTitle: string]: OptionValue[];
}

export const useProductOptions = (handle?: string) => {
  const [options, setOptions] = useState<ProductOptions>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductOptions = async () => {
      if (!handle) {
        setOptions({});
        return;
      }

      setLoading(true);
      try {
        // Get category id from handle
        const { data: category, error: categoryError } = await supabase
          .from('product_category')
          .select('id')
          .eq('handle', handle)
          .maybeSingle();

        if (categoryError || !category) {
          console.error('[useProductOptions] Category fetch error:', categoryError);
          setOptions({});
          return;
        }

        // Get product ids in this category
        const { data: productCategoryData, error: productCategoryError } = await supabase
          .from('product_category_product')
          .select('product_id')
          .eq('product_category_id', category.id);

        if (productCategoryError) {
          console.error('[useProductOptions] product_category_product fetch error:', productCategoryError);
          setOptions({});
          return;
        }

        const productIds = (productCategoryData || []).map(pc => pc.product_id);
        if (productIds.length === 0) {
          setOptions({});
          return;
        }

        // Fetch product variants for these products
        const { data: variants, error: variantsError } = await supabase
          .from('product_variant')
          .select('id, product_id')
          .in('product_id', productIds);

        if (variantsError || !variants || variants.length === 0) {
          console.error('[useProductOptions] Variants fetch error:', variantsError);
          setOptions({});
          return;
        }

        const variantIds = variants.map(v => v.id);

        // Fetch variant options with their option values and options
        const { data: variantOptions, error: variantOptionsError } = await supabase
          .from('product_variant_option')
          .select(`
            variant_id,
            option_value_id,
            product_option_value!inner(
              id,
              value,
              option_id,
              product_option!inner(
                id,
                title
              )
            )
          `)
          .in('variant_id', variantIds);

        if (variantOptionsError) {
          console.error('[useProductOptions] Variant options fetch error:', variantOptionsError);
          setOptions({});
          return;
        }

        // Process the data to count occurrences
        const optionCounts: Record<string, Record<string, Set<string>>> = {};

        (variantOptions || []).forEach((vo: any) => {
          const optionValue = vo.product_option_value;
          if (!optionValue || !optionValue.product_option) return;

          const optionTitle = optionValue.product_option.title;
          const optionValueStr = optionValue.value;

          // Skip "Default option"
          if (optionTitle === 'Default option') return;

          // Find which product this variant belongs to
          const variant = variants.find(v => v.id === vo.variant_id);
          if (!variant) return;

          if (!optionCounts[optionTitle]) {
            optionCounts[optionTitle] = {};
          }
          if (!optionCounts[optionTitle][optionValueStr]) {
            optionCounts[optionTitle][optionValueStr] = new Set();
          }
          optionCounts[optionTitle][optionValueStr].add(variant.product_id);
        });

        // Convert to final structure
        const result: ProductOptions = {};
        Object.entries(optionCounts).forEach(([optionTitle, values]) => {
          result[optionTitle] = Object.entries(values)
            .map(([value, productIds]) => ({
              value,
              count: productIds.size
            }))
            .sort((a, b) => b.count - a.count);
        });

        setOptions(result);
      } catch (e) {
        console.error('[useProductOptions] Unexpected error:', e);
        setOptions({});
      } finally {
        setLoading(false);
      }
    };

    fetchProductOptions();
  }, [handle]);

  return { options, loading };
};
