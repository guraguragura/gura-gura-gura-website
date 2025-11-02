import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryContent from '@/components/category/CategoryPage/CategoryContent';
import { useTagData } from '@/hooks/useTagData';
import { useCurrency } from '@/hooks/useCurrency';

const TagPage = () => {
  const { tagName } = useParams<{ tagName: string }>();
  const tagData = useTagData(tagName || '');
  const { formatPrice } = useCurrency();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Format tag name for display (e.g., "for-her" -> "For Her")
  const displayName = tagName
    ? tagName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
  ];

  const productsPerPage = 12;
  const totalPages = Math.ceil(tagData.totalProducts / productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <TopInfoBar />
      <Navbar />
      
      <main className="flex-1 bg-background">
        <CategoryContent 
          categoryName={displayName}
          products={tagData.products}
          loading={tagData.isLoading}
          formatPrice={formatPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={tagData.totalProducts}
          totalPages={totalPages}
          productsPerPage={productsPerPage}
          sortOptions={sortOptions}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default TagPage;
