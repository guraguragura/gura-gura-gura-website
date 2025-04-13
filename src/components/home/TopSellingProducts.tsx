
import React from "react";
import { useCurrency } from "@/hooks/useCurrency";
import NavigationControls from "./top-selling/NavigationControls";
import PromotionalBanner from "./top-selling/PromotionalBanner";
import ProductCard from "./top-selling/ProductCard";
import { products } from "./top-selling/data";

const TopSellingProducts = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <NavigationControls 
          title="Top Selling"
          subtitle="Products"
          linkUrl="/shop"
          linkText="View All Products"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Promotional Banner */}
          <PromotionalBanner />
          
          {/* Product Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                formatPrice={formatPrice}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
