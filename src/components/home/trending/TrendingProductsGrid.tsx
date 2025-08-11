
import React from "react";
import TrendingProductCard from "./TrendingProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingProductsGrid = () => {
  const { products, isLoading, error } = useProducts({ 
    limit: 4,
    // You can customize this query based on what makes a product "trending"
    // For example, you could create a field in your database to mark trending products
    onSale: true // For now, let's show products on sale as trending
  });

  if (isLoading) {
    return (
      <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2">
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
        <p className="text-gray-500">No trending products available</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {products.map((product) => (
        <TrendingProductCard 
          key={product.id} 
          product={{
            id: product.id,
            name: product.title,
            price: product.price,
            oldPrice: product.discount_price ? product.price : product.price * 1.2,
            image: product.thumbnail || "/placeholder.svg",
            badge: product.is_sale ? 'Sale' : product.is_new ? 'New' : null,
            category: product.raw_metadata?.product_type || "Product"
          }}
        />
      ))}
    </div>
  );
};

export default TrendingProductsGrid;
