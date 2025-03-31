
import React from "react";
import CategoryBreadcrumb from "@/components/category/CategoryBreadcrumb";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryFilter from "@/components/category/CategoryFilter";
import ProductListHeader from "@/components/category/ProductListHeader";
import ProductGrid from "@/components/category/ProductGrid";
import CategoryPagination from "@/components/category/CategoryPagination";

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

interface CategoryContentProps {
  categoryName: string;
  products: Product[];
  loading: boolean;
  formatPrice: (price: number) => string;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number;
  totalPages: number;
  productsPerPage: number;
  sortOptions: { label: string; value: string }[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({
  categoryName,
  products,
  loading,
  formatPrice,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  currentPage,
  setCurrentPage,
  totalProducts,
  totalPages,
  productsPerPage,
  sortOptions
}) => {
  return (
    <div className="p-6">
      <CategoryBreadcrumb categoryName={categoryName} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block">
          <CategoryHeader name={categoryName} />
          <CategoryFilter />
        </div>

        <div className="md:col-span-3">
          <div className="flex flex-col space-y-4">
            <ProductListHeader
              totalProducts={totalProducts || products.length}
              currentProducts={Math.min(products.length, productsPerPage)}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOptions={sortOptions}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <ProductGrid
              products={products}
              viewMode={viewMode}
              loading={loading}
              formatPrice={formatPrice}
            />

            <CategoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
