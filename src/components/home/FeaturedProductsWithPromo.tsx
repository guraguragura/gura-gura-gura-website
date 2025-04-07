
import React from "react";
import FeaturedHeader from "./featured/FeaturedHeader";
import FeaturedPromoBanner from "./featured/FeaturedPromoBanner";
import FeaturedProductsGrid from "./featured/FeaturedProductsGrid";

const FeaturedProductsWithPromo = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <FeaturedHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Products Section - 4 columns */}
          <FeaturedProductsGrid />
          
          {/* Promotional Banner - 1 column */}
          <FeaturedPromoBanner />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsWithPromo;
