import { Container, Heading, Input, Textarea, Button, Label, Select, toast } from "@medusajs/ui";
import { useState, useEffect } from "react";

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProductForm = ({ product, onClose, onSuccess }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    subtitle: product?.subtitle || "",
    description: product?.description || "",
    handle: product?.handle || "",
    thumbnail: product?.thumbnail || "",
    status: product?.status || "draft",
    metadata: {
      price: product?.metadata?.price || 0,
      discount_price: product?.metadata?.discount_price || undefined,
      delivery_time: product?.metadata?.delivery_time || "Same-day",
      in_stock: product?.metadata?.in_stock ?? true,
      sku: product?.metadata?.sku || "",
      is_sale: product?.metadata?.is_sale || false,
      is_new: product?.metadata?.is_new || false,
    }
  });

  const deliveryTimeOptions = [
    { value: "Same-day", label: "Same-day" },
    { value: "1–2 days", label: "1–2 days" },
    { value: "3–5 days", label: "3–5 days" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Error", { description: "Please provide a product title" });
      return;
    }

    try {
      const url = product
        ? `https://wxniywyujrxlwraocszi.supabase.co/rest/v1/product?id=eq.${product.id}`
        : "https://wxniywyujrxlwraocszi.supabase.co/rest/v1/product";

      const method = product ? "PATCH" : "POST";

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
        description: `Product ${product ? "updated" : "created"} successfully`,
      });
      onSuccess();
    } catch (error) {
      toast.error("Error", { description: "Failed to save product" });
    }
  };

  return (
    <Container className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading level="h1">
          {product ? "Edit Product" : "Create New Product"}
        </Heading>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.metadata.price}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, price: parseFloat(e.target.value) }
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="discount_price">Discount Price</Label>
          <Input
            id="discount_price"
            type="number"
            step="0.01"
            value={formData.metadata.discount_price || ""}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, discount_price: e.target.value ? parseFloat(e.target.value) : undefined }
            })}
          />
        </div>

        <div>
          <Label htmlFor="delivery_time">Delivery Time *</Label>
          <Select
            value={formData.metadata.delivery_time}
            onValueChange={(value) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, delivery_time: value }
            })}
          >
            <Select.Trigger id="delivery_time">
              <Select.Value placeholder="Select delivery time" />
            </Select.Trigger>
            <Select.Content>
              {deliveryTimeOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={formData.metadata.sku}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, sku: e.target.value }
            })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="in_stock"
            type="checkbox"
            checked={formData.metadata.in_stock}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, in_stock: e.target.checked }
            })}
            className="rounded"
          />
          <Label htmlFor="in_stock">In Stock</Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_sale"
            type="checkbox"
            checked={formData.metadata.is_sale}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, is_sale: e.target.checked }
            })}
            className="rounded"
          />
          <Label htmlFor="is_sale">On Sale</Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="is_new"
            type="checkbox"
            checked={formData.metadata.is_new}
            onChange={(e) => setFormData({ 
              ...formData, 
              metadata: { ...formData.metadata, is_new: e.target.checked }
            })}
            className="rounded"
          />
          <Label htmlFor="is_new">New Arrival</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit">
            {product ? "Update" : "Create"} Product
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};
