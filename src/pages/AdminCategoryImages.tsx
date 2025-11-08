import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";

interface Category {
  id: string;
  name: string;
  handle: string;
  metadata: any;
}

const AdminCategoryImages = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_category')
        .select('id, name, handle, metadata')
        .eq('is_active', true)
        .order('rank', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrlChange = (categoryId: string, imageUrl: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              metadata: {
                ...cat.metadata,
                image_url: imageUrl,
              },
            }
          : cat
      )
    );
  };

  const handleColorChange = (categoryId: string, color: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              metadata: {
                ...cat.metadata,
                background_color: color,
              },
            }
          : cat
      )
    );
  };

  const handleSave = async (categoryId: string) => {
    setSaving(categoryId);
    try {
      const category = categories.find(c => c.id === categoryId);
      if (!category) return;

      const { error } = await supabase
        .from('product_category')
        .update({
          metadata: category.metadata,
        })
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Updated ${category.name} category image`,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const colorOptions = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-red-100",
    "bg-indigo-100",
    "bg-pink-100",
    "bg-gray-100",
    "bg-blue-200",
    "bg-yellow-200",
  ];

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading categories...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Category Image Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.metadata?.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={category.metadata.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc";
                      }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor={`image-${category.id}`}>Image URL</Label>
                  <Input
                    id={`image-${category.id}`}
                    type="text"
                    placeholder="https://... or /lovable-uploads/..."
                    value={category.metadata?.image_url || ""}
                    onChange={(e) => handleImageUrlChange(category.id, e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`color-${category.id}`}>Background Color</Label>
                  <select
                    id={`color-${category.id}`}
                    className="w-full p-2 border rounded-md"
                    value={category.metadata?.background_color || "bg-gray-100"}
                    onChange={(e) => handleColorChange(category.id, e.target.value)}
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={() => handleSave(category.id)}
                  disabled={saving === category.id}
                  className="w-full"
                >
                  {saving === category.id ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminCategoryImages;
