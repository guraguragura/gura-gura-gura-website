import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MetadataValue {
  value: string;
  count: number;
}

export interface ProductMetadata {
  [attributeName: string]: MetadataValue[];
}

export const useProductMetadata = (handle?: string) => {
  const [metadata, setMetadata] = useState<ProductMetadata>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductMetadata = async () => {
      if (!handle) {
        setMetadata({});
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
          console.error('[useProductMetadata] Category fetch error:', categoryError);
          setMetadata({});
          return;
        }

        // Get product ids in this category
        const { data: productCategoryData, error: productCategoryError } = await supabase
          .from('product_category_product')
          .select('product_id')
          .eq('product_category_id', category.id);

        if (productCategoryError) {
          console.error('[useProductMetadata] product_category_product fetch error:', productCategoryError);
          setMetadata({});
          return;
        }

        const productIds = (productCategoryData || []).map(pc => pc.product_id);
        if (productIds.length === 0) {
          setMetadata({});
          return;
        }

        // Fetch products with their metadata
        const { data: products, error: productsError } = await supabase
          .from('product')
          .select('id, metadata')
          .in('id', productIds);

        if (productsError || !products) {
          console.error('[useProductMetadata] Products fetch error:', productsError);
          setMetadata({});
          return;
        }

        // Extract metadata attributes
        const attributeCounts: Record<string, Record<string, number>> = {};

        products.forEach(product => {
          const meta = (product.metadata as Record<string, any>) || {};
          
          // Extract brand if it exists
          if (meta.brand && typeof meta.brand === 'string') {
            if (!attributeCounts.brand) attributeCounts.brand = {};
            attributeCounts.brand[meta.brand] = (attributeCounts.brand[meta.brand] || 0) + 1;
          }

          // Extract material if it exists
          if (meta.material && typeof meta.material === 'string') {
            if (!attributeCounts.material) attributeCounts.material = {};
            attributeCounts.material[meta.material] = (attributeCounts.material[meta.material] || 0) + 1;
          }

          // Extract other common attributes
          if (meta.type && typeof meta.type === 'string') {
            if (!attributeCounts.type) attributeCounts.type = {};
            attributeCounts.type[meta.type] = (attributeCounts.type[meta.type] || 0) + 1;
          }
        });

        // Convert to final structure, only include attributes with multiple values
        const result: ProductMetadata = {};
        Object.entries(attributeCounts).forEach(([attributeName, values]) => {
          const valueEntries = Object.entries(values);
          // Only include if there are multiple different values or at least 1 value
          if (valueEntries.length > 0) {
            result[attributeName] = valueEntries
              .map(([value, count]) => ({ value, count }))
              .sort((a, b) => b.count - a.count);
          }
        });

        setMetadata(result);
      } catch (e) {
        console.error('[useProductMetadata] Unexpected error:', e);
        setMetadata({});
      } finally {
        setLoading(false);
      }
    };

    fetchProductMetadata();
  }, [handle]);

  return { metadata, loading };
};
