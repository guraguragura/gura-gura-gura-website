
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";

// Import custom hooks
import { useSubcategories } from "./filters/hooks/useSubcategories";

// Import sub-components
import CategoryList from "./filters/CategoryList";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import ColorFilter from "./filters/ColorFilter";
import BrandFilter from "./filters/BrandFilter";

// Import filter data
import { colorsData, brandsData, ratingsData } from "./filters/data/filterData";

const CategoryFilter = () => {
  const { handle, categoryName } = useParams<{ handle?: string; categoryName?: string }>();
  const currentHandle = handle || categoryName;
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  
  const { displayCategories, loading } = useSubcategories(currentHandle || undefined);

  return (
    <div className="space-y-6">
      {/* Product categories */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Product Categories</h3>
        <ul className="space-y-2">
          <CategoryList categories={displayCategories} loading={loading} />
        </ul>
      </div>

      {/* Filters */}
      <Accordion type="single" collapsible defaultValue="price">
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter ratings={ratingsData} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
        <ColorFilter colors={colorsData} colorFilter={colorFilter} setColorFilter={setColorFilter} />
        <BrandFilter brands={brandsData} brandFilter={brandFilter} setBrandFilter={setBrandFilter} />
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
