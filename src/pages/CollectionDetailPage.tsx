import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCurrency } from "@/hooks/useCurrency";
import PageLayout from "@/components/layout/PageLayout";
import CategoryContent from "@/components/category/CategoryPage/CategoryContent";
import useCollectionData from "@/hooks/useCollectionData";
import type { ProductFilters } from "@/components/category/filters/types";

const CollectionDetailPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [filters, setFilters] = useState<ProductFilters>({});
  
  const { formatPrice } = useCurrency();
  const { 
    products, 
    loading, 
    collectionName,
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
  } = useCollectionData(handle, filters);

  const displayedProducts = loading ? [] : products;

  return (
    <>
      <Helmet>
        <title>{collectionName || 'Collection'} | Gura</title>
        <meta name="description" content={`Shop ${collectionName || 'products'} on Gura`} />
      </Helmet>
      <PageLayout fullWidth={false}>
      <CategoryContent
        categoryName={collectionName}
        categoryHandle={handle}
        parentCategory={null}
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
        isCollection={true}
      />
    </PageLayout>
    </>
  );
};

export default CollectionDetailPage;
