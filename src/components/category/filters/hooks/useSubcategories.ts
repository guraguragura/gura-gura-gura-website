
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Subcategory {
  name: string;
  handle: string;
  count: number;
}

export const useSubcategories = (handle?: string) => {
  const [categories, setCategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        console.log('[useSubcategories] Fetching for handle:', handle);
        
        // First get the current category ID
        const { data: currentCategory, error: categoryError } = await supabase
          .from('product_category')
          .select('id, name, handle, mpath')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("[useSubcategories] Error fetching current category:", categoryError);
          setLoading(false);
          return;
        }

        console.log('[useSubcategories] Current category:', currentCategory);

        if (currentCategory) {
          // Fetch subcategories using the mpath pattern matching
          const mpathPattern = `${currentCategory.id}.%`;
          console.log('[useSubcategories] Searching for subcategories with mpath pattern:', mpathPattern);
          
          const { data: subcategories, error: subcategoriesError } = await supabase
            .from('product_category')
            .select('id, name, handle, mpath')
            .like('mpath', mpathPattern)
            .eq('is_active', true)
            .order('rank', { ascending: true });

          if (subcategoriesError) {
            console.error("[useSubcategories] Error fetching subcategories:", subcategoriesError);
            setLoading(false);
            return;
          }

          console.log('[useSubcategories] Found subcategories:', subcategories);

          // For each subcategory, get the count of products
          const subcategoriesWithCount = await Promise.all(
            (subcategories || []).map(async (subcat) => {
              // Get product IDs for this subcategory
              const { data: productLinks, error: productLinksError } = await supabase
                .from('product_category_product')
                .select('product_id')
                .eq('product_category_id', subcat.id);

              if (productLinksError) {
                console.error(`[useSubcategories] Error fetching products for subcategory ${subcat.name}:`, productLinksError);
                return { name: subcat.name, handle: subcat.handle, count: 0 };
              }

              const count = productLinks?.length || 0;
              console.log(`[useSubcategories] Subcategory "${subcat.name}" has ${count} products`);

              return {
                name: subcat.name,
                handle: subcat.handle,
                count
              };
            })
          );

          console.log('[useSubcategories] Final subcategories with counts:', subcategoriesWithCount);
          setCategories(subcategoriesWithCount);
        }
      } catch (error) {
        console.error("[useSubcategories] Failed to fetch subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchSubcategories();
    } else {
      setCategories([]);
      setLoading(false);
    }
  }, [handle]);

  return { displayCategories: categories, loading };
};
