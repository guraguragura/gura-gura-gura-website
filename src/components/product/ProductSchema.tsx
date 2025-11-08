import React from "react";
import { Helmet } from "react-helmet";

interface ProductSchemaProps {
  product: {
    id: string;
    title: string;
    description?: string;
    thumbnail: string;
    images?: string[];
    price: number;
    discount_price?: number;
    rating?: number;
    reviews_count?: number;
    metadata?: Record<string, any>;
  };
}

const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const metadata = product.metadata || {};
  const brand = metadata.brand || "Gura";
  const isInStock = metadata.inventory_quantity > 0 || true; // Default to in stock if not specified
  const currentPrice = product.discount_price || product.price;
  
  // Build aggregate rating if reviews exist
  const aggregateRating = product.rating && product.reviews_count ? {
    "@type": "AggregateRating",
    "ratingValue": product.rating.toFixed(1),
    "reviewCount": product.reviews_count,
    "bestRating": "5",
    "worstRating": "1"
  } : undefined;

  // Get all product images
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail];

  // Make sure images are absolute URLs
  const absoluteImages = productImages.map(img => {
    if (img.startsWith('http')) return img;
    return `${window.location.origin}${img}`;
  });

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "description": product.description || product.title,
    "image": absoluteImages,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "USD",
      "price": currentPrice.toFixed(2),
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": isInStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    ...(aggregateRating && { "aggregateRating": aggregateRating })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;
