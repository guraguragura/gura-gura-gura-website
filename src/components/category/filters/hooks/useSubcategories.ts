
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Subcategory {
  name: string;
  handle: string;
  metadata?: {
    image?: string;
  };
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
            .select('id, name, handle, metadata')
            .like('mpath', `${currentCategory.id}.%`)
            .eq('is_active', true)
            .order('rank', { ascending: true });

          if (subcategoriesError) {
            console.error("Error fetching subcategories:", subcategoriesError);
            setLoading(false);
            return;
          }

          // Map subcategories with metadata
          const subcategoriesData = (subcategories || []).map((subcat) => ({
            name: subcat.name,
            handle: subcat.handle,
            metadata: subcat.metadata as { image?: string } | undefined
          }));

          setCategories(subcategoriesData);
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
    { name: "Mobile & Accessories", handle: "mobile-accessories" },
    { name: "Laptop", handle: "laptop" },
    { name: "Electronics", handle: "electronics" },
    { name: "Smart Watch", handle: "smart-watch" },
    { name: "Storage", handle: "storage" },
    { name: "Portable Devices", handle: "portable-devices" },
    { name: "Action Camera", handle: "action-camera" },
    { name: "Smart Gadget", handle: "smart-gadget" },
    { name: "Monitor", handle: "monitor" },
    { name: "Smart TV", handle: "smart-tv" },
    { name: "Camera", handle: "camera" },
  ];

  const displayCategories = categories.length > 0 ? categories : mockCategories;

  return { displayCategories, loading };
};
