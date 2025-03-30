
import React from "react";
import ProductViewToggle from "./ProductViewToggle";

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
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border">
      <div>
        <span className="text-sm text-gray-500">
          Showing 1-{currentProducts} of {totalProducts} results
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <ProductViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <select
          className="border rounded-md px-3 py-1 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>
            Sort by
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
