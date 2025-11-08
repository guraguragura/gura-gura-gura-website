
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
  metadata?: any;
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
          .select('id, name, handle, metadata')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        } else {
          
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

  const displayCategories = categories;
  
  return {
    loading,
    displayCategories
  };
};
