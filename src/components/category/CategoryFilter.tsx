
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";

// Import custom hooks
import { useSubcategories } from "./filters/hooks/useSubcategories";
import { useCategoryRatings } from "./filters/hooks/useCategoryRatings";
import { useProductOptions } from "./filters/hooks/useProductOptions";
import { useProductMetadata } from "./filters/hooks/useProductMetadata";

// Import sub-components
import CategoryList from "./filters/CategoryList";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import GenericOptionFilter from "./filters/GenericOptionFilter";

const CategoryFilter = () => {
  // Use destructuring to get all potential parameter names
  const { handle, id, categoryName } = useParams<{ 
    handle?: string; 
    id?: string; 
    categoryName?: string; 
  }>();
  
  // Use whichever parameter is available
  const categoryHandle = handle || id || categoryName;
  
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<string, string | null>>({});
  
  const { displayCategories, loading } = useSubcategories(categoryHandle);
  const { ratings: dynamicRatings } = useCategoryRatings(categoryHandle);
  const { options: productOptions } = useProductOptions(categoryHandle);
  const { metadata: productMetadata } = useProductMetadata(categoryHandle);

  const handleFilterChange = (key: string, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
        <RatingFilter ratings={dynamicRatings} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
        
        {/* Dynamic Product Options */}
        {productOptions.Size && (
          <GenericOptionFilter
            title="Filter by Size"
            filterKey="size"
            options={productOptions.Size}
            selectedValue={filters.size || null}
            onChange={(value) => handleFilterChange('size', value)}
          />
        )}
        
        {productOptions.Color && (
          <GenericOptionFilter
            title="Filter by Color"
            filterKey="color"
            options={productOptions.Color}
            selectedValue={filters.color || null}
            onChange={(value) => handleFilterChange('color', value)}
          />
        )}
        
        {/* Dynamic Product Metadata */}
        {productMetadata.brand && (
          <GenericOptionFilter
            title="Filter by Brand"
            filterKey="brand"
            options={productMetadata.brand}
            selectedValue={filters.brand || null}
            onChange={(value) => handleFilterChange('brand', value)}
          />
        )}
        
        {productMetadata.material && (
          <GenericOptionFilter
            title="Filter by Material"
            filterKey="material"
            options={productMetadata.material}
            selectedValue={filters.material || null}
            onChange={(value) => handleFilterChange('material', value)}
          />
        )}
        
        {productMetadata.type && (
          <GenericOptionFilter
            title="Filter by Type"
            filterKey="type"
            options={productMetadata.type}
            selectedValue={filters.type || null}
            onChange={(value) => handleFilterChange('type', value)}
          />
        )}
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
