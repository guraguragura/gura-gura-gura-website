import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useEffect, useState } from "react";
import CategoryImageForm from "../components/category-image-form";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wxniywyujrxlwraocszi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Category {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
  metadata: any;
}

const CategoryImagesWidget = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'parent' | 'subcategory'>('all');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_category')
        .select('id, name, handle, parent_category_id, metadata')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(cat => {
    if (filterType === 'parent') return !cat.parent_category_id;
    if (filterType === 'subcategory') return cat.parent_category_id;
    return true;
  });

  const getParentName = (parentId: string | null) => {
    if (!parentId) return '-';
    const parent = categories.find(c => c.id === parentId);
    return parent?.name || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Category Image Manager</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded text-sm ${
              filterType === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({categories.length})
          </button>
          <button
            onClick={() => setFilterType('parent')}
            className={`px-3 py-1 rounded text-sm ${
              filterType === 'parent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Parents ({categories.filter(c => !c.parent_category_id).length})
          </button>
          <button
            onClick={() => setFilterType('subcategory')}
            className={`px-3 py-1 rounded text-sm ${
              filterType === 'subcategory' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Subcategories ({categories.filter(c => c.parent_category_id).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 font-semibold">Image</th>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Handle</th>
                <th className="text-left p-3 font-semibold">Parent</th>
                <th className="text-left p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {category.metadata?.image ? (
                      <img 
                        src={category.metadata.image} 
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3 text-sm text-gray-600">{category.handle}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {getParentName(category.parent_category_id)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      {category.metadata?.image ? 'Edit Image' : 'Add Image'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              No categories found
            </div>
          )}
        </div>
      )}

      {editingCategory && (
        <CategoryImageForm
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "product.list.before",
});

export default CategoryImagesWidget;
