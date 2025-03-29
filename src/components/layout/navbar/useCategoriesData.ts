
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
}

export const useCategoriesData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        } else {
          console.log("Categories fetched:", data);
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fallback categories in case the data fetch fails
  const fallbackCategories = [
    { id: "pcat_01", name: "Women's Collection", handle: "women" },
    { id: "pcat_02", name: "Men's Collection", handle: "men" },
    { id: "pcat_03", name: "Home & Art", handle: "home-art" },
    { id: "pcat_04", name: "Kids", handle: "kids" },
    { id: "pcat_05", name: "Beauty", handle: "beauty" },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  
  return {
    loading,
    displayCategories
  };
};
