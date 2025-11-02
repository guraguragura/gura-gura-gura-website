import React, { useState } from 'react';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryContent from '@/components/category/CategoryPage/CategoryContent';
import { useGiftsData } from '@/hooks/useGiftsData';
import { useCurrency } from '@/hooks/useCurrency';

const GiftsPage = () => {
  const giftsData = useGiftsData();
  const { formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
  ];

  const productsPerPage = 12;
  const totalPages = Math.ceil(giftsData.totalProducts / productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <TopInfoBar />
      <Navbar />
      
      <main className="flex-1 bg-background">
        <CategoryContent 
          categoryName="Gifts for Everyone"
          products={giftsData.products}
          loading={giftsData.isLoading}
          formatPrice={formatPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={giftsData.totalProducts}
          totalPages={totalPages}
          productsPerPage={productsPerPage}
          sortOptions={sortOptions}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default GiftsPage;
