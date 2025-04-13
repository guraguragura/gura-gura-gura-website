
import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  reviews_count: number;
  discount_price?: number;
  is_sale?: boolean;
  is_new?: boolean;
}

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
  loading: boolean;
  formatPrice: (price: number) => string;
}

const ProductGrid = ({ products, viewMode, loading, formatPrice }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array(6).fill(null).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="h-48 w-full bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-b-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewMode={viewMode} 
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
