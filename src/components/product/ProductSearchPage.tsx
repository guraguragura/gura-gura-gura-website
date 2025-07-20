import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdvancedProductSearch, AdvancedProductFilters } from "@/hooks/useAdvancedProductSearch";
import { useCurrency } from "@/hooks/useCurrency";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/category/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ProductSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  
  const [filters, setFilters] = useState<AdvancedProductFilters>({
    query: searchParams.get('q') || '',
    sortBy: 'popularity'
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, totalCount } = useAdvancedProductSearch(filters);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setFilters(prev => ({ ...prev, query }));
    }
  }, [searchParams]);

  const updateFilter = (key: keyof AdvancedProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof AdvancedProductFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({ query: filters.query, sortBy: 'popularity' });
    setPriceRange([0, 1000]);
  };

  const activeFiltersCount = Object.keys(filters).filter(key => 
    key !== 'query' && key !== 'sortBy' && filters[key as keyof AdvancedProductFilters]
  ).length;

  if (loading) {
    return (
      <PageLayout fullWidth={false}>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout fullWidth={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {filters.query ? `Search results for "${filters.query}"` : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            {totalCount} {totalCount === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto"
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
          
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.priceRange && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Price: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter('priceRange')}
                />
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {filters.category}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter('category')}
                />
              </Badge>
            )}
            {filters.brand && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Brand: {filters.brand}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter('brand')}
                />
              </Badge>
            )}
            {filters.rating && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Rating: {filters.rating}+ stars
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => clearFilter('rating')}
                />
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value as [number, number]);
                    updateFilter('priceRange', value);
                  }}
                  max={1000}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <Select value={filters.category || ''} onValueChange={(value) => updateFilter('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                <Select value={filters.rating?.toString() || ''} onValueChange={(value) => updateFilter('rating', value ? parseInt(value) : undefined)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any rating</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="2">2+ stars</SelectItem>
                    <SelectItem value="1">1+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            <Button variant="outline" onClick={clearAllFilters} className="mt-4">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductSearchPage;