import { Container, Heading, Input, Textarea, Button, Label, toast } from "@medusajs/ui";
import { useState } from "react";

interface ArticleFormProps {
  article?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ArticleForm = ({ article, onClose, onSuccess }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    subtitle: article?.subtitle || "",
    image_url: article?.image_url || "",
    link_url: article?.link_url || "/shop",
    background_color: article?.background_color || "bg-gray-100",
    is_active: article?.is_active ?? true,
    published_at: article?.published_at || new Date().toISOString(),
    slug: article?.slug || "",
    content: article?.content || "",
    author: article?.author || "",
    excerpt: article?.excerpt || "",
    featured_image_alt: article?.featured_image_alt || "",
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(article?.image_url || "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Error", { description: "Please upload a JPG, PNG, or WEBP image" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Error", { description: "Image must be less than 5MB" });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      // Upload to Supabase Storage
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const uploadResponse = await fetch(
        `https://wxniywyujrxlwraocszi.supabase.co/storage/v1/object/article-images/${filePath}`,
        {
          method: "POST",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4`,
          },
          body: formDataUpload,
        }
      );

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const publicUrl = `https://wxniywyujrxlwraocszi.supabase.co/storage/v1/object/public/article-images/${filePath}`;

      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(publicUrl);
      toast.success("Success", { description: "Image uploaded" });
    } catch (error) {
      toast.error("Error", { description: "Failed to upload image" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.image_url) {
      toast.error("Error", { description: "Please fill all required fields" });
      return;
    }

    try {
      const url = article
        ? `https://wxniywyujrxlwraocszi.supabase.co/rest/v1/promotional_articles?id=eq.${article.id}`
        : "https://wxniywyujrxlwraocszi.supabase.co/rest/v1/promotional_articles";

      const method = article ? "PATCH" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bml5d3l1anJ4bHdyYW9jc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAwMzksImV4cCI6MjA1ODUxNjAzOX0.sLeA6SrFj68qsL7cddid3MEO0v_XbL_vvagAPt-ySF4`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(formData),
      });

      toast.success("Success", {
        description: `Article ${article ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error) {
      toast.error("Error", { description: "Failed to save article" });
    }
  };

  return (
    <Container className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading level="h1">
          {article ? "Edit Article" : "Create New Article"}
        </Heading>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle *</Label>
          <Textarea
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image * (JPG, PNG, WEBP - Max 5MB)</Label>
          <input
            id="image"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          {uploading && <p className="mt-2 text-sm">Uploading...</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-48 h-48 object-cover rounded"
            />
          )}
        </div>

        <div>
          <Label htmlFor="slug">Slug (leave empty for auto-generation)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-generated-from-title"
          />
          <p className="text-xs text-gray-500 mt-1">URL-friendly identifier. Leave blank to auto-generate from title.</p>
        </div>

        <div>
          <Label htmlFor="content">Article Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            placeholder="Full article content (supports HTML)"
          />
          <p className="text-xs text-gray-500 mt-1">Use HTML tags for formatting. Leave empty to use link_url.</p>
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt (optional)</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            placeholder="Brief summary for previews. Defaults to subtitle if empty."
          />
        </div>

        <div>
          <Label htmlFor="author">Author (optional)</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="e.g., Gura Editorial Team"
          />
        </div>

        <div>
          <Label htmlFor="featured_image_alt">Image Alt Text (recommended for accessibility)</Label>
          <Input
            id="featured_image_alt"
            value={formData.featured_image_alt}
            onChange={(e) => setFormData({ ...formData, featured_image_alt: e.target.value })}
            placeholder="Descriptive text for the featured image"
          />
        </div>

        <div>
          <Label htmlFor="link_url">External Link URL (optional)</Label>
          <Input
            id="link_url"
            value={formData.link_url}
            onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
            placeholder="/shop or https://example.com"
          />
          <p className="text-xs text-gray-500 mt-1">Only used if content is empty. Readers will see internal content first.</p>
        </div>

        <div>
          <Label htmlFor="background_color">Background Color (Tailwind class)</Label>
          <Input
            id="background_color"
            value={formData.background_color}
            onChange={(e) =>
              setFormData({ ...formData, background_color: e.target.value })
            }
            placeholder="e.g., bg-orange-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_active"
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded"
          />
          <Label htmlFor="is_active">Active</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={uploading}>
            {article ? "Update" : "Create"} Article
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};
