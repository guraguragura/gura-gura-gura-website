
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
        // First get the current category ID
        const { data: currentCategory, error: categoryError } = await supabase
          .from('product_category')
          .select('id, name')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching current category:", categoryError);
          setLoading(false);
          return;
        }

        if (currentCategory) {
          // Fetch subcategories using the mpath pattern matching
          const { data: subcategories, error: subcategoriesError } = await supabase
            .from('product_category')
            .select('id, name, handle')
            .like('mpath', `${currentCategory.id}.%`)
            .eq('is_active', true)
            .order('rank', { ascending: true });

          if (subcategoriesError) {
            console.error("Error fetching subcategories:", subcategoriesError);
            setLoading(false);
            return;
          }

          // For each subcategory, get the count of products
          const subcategoriesWithCount = await Promise.all(
            (subcategories || []).map(async (subcat) => {
              // Get product IDs for this subcategory
              const { data: productLinks, error: productLinksError } = await supabase
                .from('product_category_product')
                .select('product_id')
                .eq('product_category_id', subcat.id);

              if (productLinksError) {
                console.error(`Error fetching products for subcategory ${subcat.name}:`, productLinksError);
                return { ...subcat, count: 0 };
              }

              return {
                name: subcat.name,
                handle: subcat.handle,
                count: productLinks?.length || 0
              };
            })
          );

          setCategories(subcategoriesWithCount);
        }
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchSubcategories();
    }
  }, [handle]);

  // Fallback to mock data if no subcategories are found
  const mockCategories = [
    { name: "Mobile & Accessories", handle: "mobile-accessories", count: 32 },
    { name: "Laptop", handle: "laptop", count: 24 },
    { name: "Electronics", handle: "electronics", count: 52 },
    { name: "Smart Watch", handle: "smart-watch", count: 32 },
    { name: "Storage", handle: "storage", count: 25 },
    { name: "Portable Devices", handle: "portable-devices", count: 35 },
    { name: "Action Camera", handle: "action-camera", count: 25 },
    { name: "Smart Gadget", handle: "smart-gadget", count: 32 },
    { name: "Monitor", handle: "monitor", count: 32 },
    { name: "Smart TV", handle: "smart-tv", count: 12 },
    { name: "Camera", handle: "camera", count: 12 },
  ];

  const displayCategories = categories.length > 0 ? categories : mockCategories;

  return { displayCategories, loading };
};
