import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
  rank: number;
  metadata?: any;
}

interface Subcategory {
  id: string;
  name: string;
  handle: string;
  rank: number;
  metadata?: any;
}

export const useCategoryMegaMenu = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [subcategoriesByParent, setSubcategoriesByParent] = useState<Record<string, Subcategory[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      setLoading(true);
      try {
        // Fetch parent categories
        const { data: parents, error: parentsError } = await supabase
          .from('product_category')
          .select('id, name, handle, rank, metadata')
          .is('parent_category_id', null)
          .eq('is_active', true)
          .order('rank', { ascending: true });

        if (parentsError) {
          console.error("Error fetching parent categories:", parentsError);
          setParentCategories([]);
          return;
        }

        setParentCategories(parents || []);

        // Fetch all subcategories for each parent
        const subcategoriesMap: Record<string, Subcategory[]> = {};
        
        for (const parent of parents || []) {
          const { data: children, error: childrenError } = await supabase
            .from('product_category')
            .select('id, name, handle, rank, metadata')
            .eq('parent_category_id', parent.id)
            .eq('is_active', true)
            .order('rank', { ascending: true });

          if (!childrenError && children) {
            subcategoriesMap[parent.id] = children;
          }
        }

        setSubcategoriesByParent(subcategoriesMap);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setParentCategories([]);
        setSubcategoriesByParent({});
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  return {
    parentCategories,
    subcategoriesByParent,
    loading
  };
};
