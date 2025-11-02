
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  name: string;
  handle: string;
  parent_category_id?: string | null;
  metadata?: any;
}

export interface CategoryWithChildren {
  category: Category;
  subcategories: Category[];
}

export const useCategoriesData = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [categoriesWithChildren, setCategoriesWithChildren] = useState<CategoryWithChildren[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Fetch all active categories
        const { data: allCategories, error } = await supabase
          .from('product_category')
          .select('id, name, handle, parent_category_id, metadata')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setParentCategories([]);
          setCategoriesWithChildren([]);
        } else if (allCategories) {
          // Filter parent categories (no parent_category_id)
          const parents = allCategories.filter(cat => !cat.parent_category_id);
          setParentCategories(parents);
          
          // Build hierarchy: group subcategories under parents
          const hierarchy: CategoryWithChildren[] = parents.map(parent => ({
            category: parent,
            subcategories: allCategories.filter(cat => cat.parent_category_id === parent.id)
          }));
          
          setCategoriesWithChildren(hierarchy);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setParentCategories([]);
        setCategoriesWithChildren([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  return {
    loading,
    parentCategories,
    categoriesWithChildren
  };
};
