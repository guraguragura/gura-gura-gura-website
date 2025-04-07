
import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import { featuredProducts } from "./featuredProductsData";

const FeaturedProductsGrid = () => {
  return (
    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {featuredProducts.map((product) => (
        <FeaturedProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProductsGrid;
