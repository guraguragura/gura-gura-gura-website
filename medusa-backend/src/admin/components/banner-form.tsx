import React, { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";

interface BannerFormProps {
  banner?: any;
  onSave: () => void;
  onCancel: () => void;
}

const BANNER_DIMENSIONS = {
  'hero': {
    width: 1920,
    height: 450,
    description: 'Hero Carousel Banner',
    note: 'Full-width responsive. Recommended for large promotional campaigns.'
  },
  'promotional': {
    width: 800,
    height: 400,
    description: 'Promotional Banner (2 side-by-side)',
    note: 'Two banners appear side-by-side on desktop.'
  },
  'seasonal': {
    width: 1920,
    height: 280,
    description: 'Cyber Monday / Seasonal Banner',
    note: 'Full-width fixed height banner.'
  },
  'featured-promo': {
    width: 400,
    height: 300,
    description: 'Featured Products Promo Banner',
    note: 'Appears alongside featured products section.'
  },
  'trending-promo': {
    width: 400,
    height: 300,
    description: 'Trending Products Promo Banner',
    note: 'Appears alongside trending products section.'
  },
  'top-selling-promo': {
    width: 500,
    height: 400,
    description: 'Top Selling Promo Banner',
    note: 'Appears alongside top-selling products section.'
  }
};

const BannerForm: React.FC<BannerFormProps> = ({ banner, onSave, onCancel }) => {
  const [title, setTitle] = useState(banner?.title || "");
  const [placement, setPlacement] = useState(banner?.placement || "hero");
  const [linkType, setLinkType] = useState(banner?.link_type || "none");
  const [linkValue, setLinkValue] = useState(banner?.link_value || "");
  const [displayOrder, setDisplayOrder] = useState(banner?.display_order || 0);
  const [isActive, setIsActive] = useState(banner?.is_active ?? true);
  const [startDate, setStartDate] = useState(banner?.start_date?.split('T')[0] || "");
  const [endDate, setEndDate] = useState(banner?.end_date?.split('T')[0] || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(banner?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    fetchLinkOptions();
  }, []);

  const fetchLinkOptions = async () => {
    const { data: productsData } = await supabase
      .from("product")
      .select("id, title, handle")
      .eq("status", "published")
      .limit(100);
    
    const { data: categoriesData } = await supabase
      .from("product_category")
      .select("id, name, handle")
      .limit(100);
    
    const { data: collectionsData } = await supabase
      .from("product_collection")
      .select("id, title, handle")
      .limit(100);

    setProducts(productsData || []);
    setCategories(categoriesData || []);
    setCollections(collectionsData || []);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      const recommendedDims = BANNER_DIMENSIONS[placement as keyof typeof BANNER_DIMENSIONS];
      if (recommendedDims) {
        const widthMatch = img.width === recommendedDims.width;
        const heightMatch = img.height === recommendedDims.height;
        
        if (!widthMatch || !heightMatch) {
          alert(`Image is ${img.width}×${img.height}px. Recommended: ${recommendedDims.width}×${recommendedDims.height}px. You can still upload, but it may not display optimally.`);
        }
      }
      URL.revokeObjectURL(objectUrl);
    };
    
    img.src = objectUrl;
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return imageUrl;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banner-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const finalImageUrl = await uploadImage();

      const bannerData = {
        title,
        image_url: finalImageUrl,
        placement,
        link_type: linkType,
        link_value: linkValue || null,
        display_order: displayOrder,
        is_active: isActive,
        start_date: startDate || null,
        end_date: endDate || null,
      };

      if (banner) {
        const { error } = await supabase
          .from('promotional_banners')
          .update(bannerData)
          .eq('id', banner.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('promotional_banners')
          .insert([bannerData]);

        if (error) throw error;
      }

      onSave();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  const selectedDimensions = BANNER_DIMENSIONS[placement as keyof typeof BANNER_DIMENSIONS];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {banner ? 'Edit Banner' : 'Create New Banner'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Placement *</label>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="hero">Hero Carousel</option>
            <option value="promotional">Promotional Banners</option>
            <option value="seasonal">Seasonal Banner</option>
            <option value="featured-promo">Featured Products Promo</option>
            <option value="trending-promo">Trending Products Promo</option>
            <option value="top-selling-promo">Top Selling Promo</option>
          </select>
          
          {selectedDimensions && (
            <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                📐 Recommended Dimensions: {selectedDimensions.width}px × {selectedDimensions.height}px
              </p>
              <p className="text-xs text-blue-700 mt-1">{selectedDimensions.description}</p>
              <p className="text-xs text-blue-600 mt-1 italic">{selectedDimensions.note}</p>
              <div className="mt-2 text-xs text-blue-800">
                <strong>Design Guidelines:</strong>
                <ul className="list-disc ml-4 mt-1">
                  <li>Format: JPG, PNG, or WEBP</li>
                  <li>Max file size: 5MB</li>
                  <li>Color mode: RGB</li>
                  <li>Resolution: 72-150 DPI for web</li>
                  <li>⚠️ Entire banner will be clickable - ensure text is readable</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Banner Image * 
            {selectedDimensions && (
              <span className="text-blue-600 font-normal">
                ({selectedDimensions.width}×{selectedDimensions.height}px recommended)
              </span>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded px-3 py-2"
          />
          {(imageUrl || imageFile) && (
            <div className="mt-2">
              <img 
                src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} 
                alt="Preview" 
                className="max-h-40 rounded"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Link Type *</label>
          <select
            value={linkType}
            onChange={(e) => setLinkType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="none">No Link</option>
            <option value="product">Product</option>
            <option value="category">Category</option>
            <option value="collection">Collection</option>
            <option value="external">External URL</option>
          </select>
        </div>

        {linkType === 'product' && (
          <div>
            <label className="block text-sm font-medium mb-1">Select Product</label>
            <select
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a product...</option>
              {products.map(p => (
                <option key={p.id} value={p.handle}>{p.title}</option>
              ))}
            </select>
          </div>
        )}

        {linkType === 'category' && (
          <div>
            <label className="block text-sm font-medium mb-1">Select Category</label>
            <select
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a category...</option>
              {categories.map(c => (
                <option key={c.id} value={c.handle}>{c.name}</option>
              ))}
            </select>
          </div>
        )}

        {linkType === 'collection' && (
          <div>
            <label className="block text-sm font-medium mb-1">Select Collection</label>
            <select
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a collection...</option>
              {collections.map(c => (
                <option key={c.id} value={c.handle}>{c.title}</option>
              ))}
            </select>
          </div>
        )}

        {linkType === 'external' && (
          <div>
            <label className="block text-sm font-medium mb-1">External URL</label>
            <input
              type="url"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              placeholder="https://example.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Display Order</label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date (Optional)</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium">Active</label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={uploading || saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading || saving ? 'Saving...' : 'Save Banner'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
