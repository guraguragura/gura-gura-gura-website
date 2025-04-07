
import React from "react";
import TrendingProductCard from "./TrendingProductCard";
import { trendingProducts } from "./trendingProductsData";

const TrendingProductsGrid = () => {
  return (
    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {trendingProducts.map((product) => (
        <TrendingProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TrendingProductsGrid;
