import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PageLayout from "@/components/layout/PageLayout";
import CategoryBreadcrumb from "@/components/category/CategoryBreadcrumb";
import CategoryContent from "@/components/category/CategoryPage/CategoryContent";
import useDealsData from "@/hooks/useDealsData";
import { useCurrency } from "@/hooks/useCurrency";
import type { ProductFilters } from "@/components/category/filters/types";

const DealsPage = () => {
  const [filters, setFilters] = useState<ProductFilters>({});
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
  } = useDealsData(filters);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Deals & Offers | Gura</title>
        <meta name="description" content="Discover amazing deals and special offers on Gura" />
      </Helmet>
      <PageLayout fullWidth={false}>
      <CategoryContent
        categoryName={categoryName}
        categoryHandle="deals"
        products={products}
        loading={loading}
        formatPrice={formatPrice}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={sortOptions}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setCurrentPage={setCurrentPage}
        onFiltersChange={handleFiltersChange}
      />
    </PageLayout>
    </>
  );
};

export default DealsPage;

