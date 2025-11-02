import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wxniywyujrxlwraocszi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Category {
  id: string;
  name: string;
  handle: string;
  metadata: any;
}

interface CategoryImageFormProps {
  category: Category;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryImageForm: React.FC<CategoryImageFormProps> = ({ 
  category, 
  onClose, 
  onSuccess 
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(category.metadata?.image || '');
  const [previewUrl, setPreviewUrl] = useState(category.metadata?.image || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `category-${category.handle}-${Date.now()}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      setPreviewUrl(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Please upload an image');
      return;
    }

    try {
      const updatedMetadata = {
        ...(category.metadata || {}),
        image: imageUrl
      };

      const { error } = await supabase
        .from('product_category')
        .update({ 
          metadata: updatedMetadata,
          updated_at: new Date().toISOString()
        })
        .eq('id', category.id);

      if (error) throw error;

      alert('Category image updated successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error updating category:', error);
      alert('Failed to update category: ' + error.message);
    }
  };

  const handleRemoveImage = async () => {
    if (!confirm('Are you sure you want to remove this image?')) return;

    try {
      const updatedMetadata = { ...(category.metadata || {}) };
      delete updatedMetadata.image;

      const { error } = await supabase
        .from('product_category')
        .update({ 
          metadata: Object.keys(updatedMetadata).length > 0 ? updatedMetadata : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', category.id);

      if (error) throw error;

      setImageUrl('');
      setPreviewUrl('');
      alert('Image removed successfully!');
      onSuccess();
    } catch (error: any) {
      console.error('Error removing image:', error);
      alert('Failed to remove image: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Category Image</h2>
        <p className="text-sm text-gray-600 mb-4">Category: {category.name}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-3 py-2 border rounded"
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-2">Uploading image...</p>
            )}
          </div>

          {previewUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Preview</label>
              <img 
                src={previewUrl} 
                alt={category.name}
                className="w-full h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove Image
              </button>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !imageUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryImageForm;
