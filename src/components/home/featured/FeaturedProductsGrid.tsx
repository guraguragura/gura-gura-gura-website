
import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProductsGrid = () => {
  const { products, isLoading, error } = useProducts({ 
    limit: 4,
    tag: 'Featured'
  });

  

  if (isLoading) {
    return (
      <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(4).fill(0).map((_, index) => (
          <div key={`loading-${index}`} className="border rounded-lg p-3">
            <Skeleton className="w-full aspect-square mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="lg:col-span-4 flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No featured products available</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <FeaturedProductCard 
          key={product.id} 
          product={{
            id: product.id,
            name: product.title,
            price: product.price,
            oldPrice: product.discount_price ? product.price : product.price * 1.2,
            image: product.thumbnail || "/placeholder.svg",
            badges: [
              product.is_new ? 'new' : null,
              product.is_sale ? 'sale' : null
            ].filter(Boolean) as string[],
            rating: product.rating || 4.5,
            category: product.raw_metadata?.product_type || "Product",
            badge: product.is_sale ? 'Sale' : product.is_new ? 'New' : null
          }}
        />
      ))}
    </div>
  );
};

export default FeaturedProductsGrid;
