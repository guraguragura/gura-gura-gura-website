
import React from "react";
import TrendingHeader from "./trending/TrendingHeader";
import TrendingPromoBanner from "./trending/TrendingPromoBanner";
import TrendingProductsGrid from "./trending/TrendingProductsGrid";

const TrendingPurchasesWithPromo = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <TrendingHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Promotional Banner - 1 column, on the left */}
          <TrendingPromoBanner />
          
          {/* Products Section - 4 columns, on the right */}
          <TrendingProductsGrid />
        </div>
      </div>
    </section>
  );
};

export default TrendingPurchasesWithPromo;
