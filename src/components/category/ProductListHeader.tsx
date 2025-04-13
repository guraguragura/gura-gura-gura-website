
import React from "react";
import ProductViewToggle from "./ProductViewToggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductListHeaderProps {
  totalProducts: number;
  currentProducts: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOptions: { label: string; value: string }[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ProductListHeader = ({
  totalProducts,
  currentProducts,
  sortBy,
  setSortBy,
  sortOptions,
  viewMode,
  setViewMode,
}: ProductListHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 sm:p-4 rounded-md shadow-sm border gap-2 sm:gap-0">
      <div>
        <span className="text-xs sm:text-sm text-gray-500">
          Showing 1-{currentProducts} of {totalProducts} results
        </span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
        <ProductViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <select
          className="border rounded-md px-2 py-1 text-xs sm:text-sm w-full sm:w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>
            {isMobile ? "Sort" : "Sort by"}
          </option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductListHeader;
