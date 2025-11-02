import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button, Input, Label, toast } from "@medusajs/ui";

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
}

const CategoryImageForm: React.FC<CategoryImageFormProps> = ({ category }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(category.metadata?.image || '');
  const [previewUrl, setPreviewUrl] = useState(category.metadata?.image || '');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Error', { description: `Only image files allowed: ${allowedTypes.join(', ')}` });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Error', { description: 'Image size should be less than 5MB' });
      return;
    }

    setUploading(true);
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('categoryId', category.id);
      formData.append('categoryHandle', category.handle);

      // Call Edge Function
      const { data, error } = await supabase.functions.invoke('category-image-upload', {
        body: formData
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Upload failed');

      setImageUrl(data.imageUrl);
      setPreviewUrl(data.imageUrl);
      toast.success('Success', { description: 'Image uploaded and category updated successfully!' });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Error', { description: 'Failed to upload image: ' + error.message });
    } finally {
      setUploading(false);
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
      toast.success('Success', { description: 'Image removed successfully!' });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      console.error('Error removing image:', error);
      toast.error('Error', { description: 'Failed to remove image: ' + error.message });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category-image">Upload Image</Label>
        <Input
          id="category-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="mt-2"
        />
        {uploading && (
          <p className="text-sm text-ui-fg-subtle mt-2">Uploading image...</p>
        )}
      </div>

      {previewUrl && (
        <div>
          <Label>Current Image</Label>
          <img 
            src={previewUrl} 
            alt={category.name}
            className="w-full h-48 object-cover rounded-lg border mt-2"
          />
          <Button
            type="button"
            variant="danger"
            size="small"
            onClick={handleRemoveImage}
            className="mt-2"
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryImageForm;
