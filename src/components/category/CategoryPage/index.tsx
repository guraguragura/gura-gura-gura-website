
import React from "react";
import { useParams } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import PageLayout from "@/components/layout/PageLayout";
import CategoryContent from "./CategoryContent";
import useCategoryData from "./useCategoryData";

const CategoryPage = () => {
  // Use destructuring to get both potential parameter names
  const { handle, id } = useParams<{ handle?: string; id?: string }>();
  
  // Use whichever parameter is available (handle from /categories/:handle or id from /category/:id)
  const categoryHandle = handle || id;
  
  const { formatPrice } = useCurrency();
  const { 
    products, 
    loading, 
    categoryName, 
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
  } = useCategoryData(categoryHandle);

  const displayedProducts = loading ? [] : products;

  return (
    <PageLayout fullWidth={false}>
      <CategoryContent
        categoryName={categoryName}
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
      />
    </PageLayout>
  );
};

export default CategoryPage;
