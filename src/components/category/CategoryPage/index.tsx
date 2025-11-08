
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import PageLayout from "@/components/layout/PageLayout";
import CategoryContent from "./CategoryContent";
import useCategoryData from "./useCategoryData";
import type { ProductFilters } from "@/components/category/filters/types";

const CategoryPage = () => {
  const { handle, id, categoryName } = useParams<{ 
    handle?: string; 
    id?: string; 
    categoryName?: string; 
  }>();
  
  const categoryHandle = handle || id || categoryName;
  const [filters, setFilters] = useState<ProductFilters>({});
  
  const { formatPrice } = useCurrency();
  const { 
    products, 
    loading, 
    categoryName: resolvedCategoryName,
    parentCategory,
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
  } = useCategoryData(categoryHandle, filters);

  const displayedProducts = loading ? [] : products;

  return (
    <PageLayout fullWidth={false}>
      <CategoryContent
        categoryName={resolvedCategoryName}
        categoryHandle={categoryHandle}
        parentCategory={parentCategory}
        products={displayedProducts}
        loading={loading}
        formatPrice={formatPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
        totalPages={totalPages}
        productsPerPage={productsPerPage}
        sortOptions={sortOptions}
        onFiltersChange={setFilters}
      />
    </PageLayout>
  );
};

export default CategoryPage;
