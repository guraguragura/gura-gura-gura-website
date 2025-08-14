import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, X, TrendingUp } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/category/ProductCard";
import { useAdvancedProductSearch } from "@/hooks/useAdvancedProductSearch";
import { useFuzzyProductSearch } from "@/hooks/useFuzzyProductSearch";
import { useProducts } from "@/hooks/useProducts";

export interface SearchFilters {
  query: string;
  sortBy: string;
  priceRange: [number, number];
  category: string;
  rating: number;
}

const ProductSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    sortBy: "relevance",
    priceRange: [0, 1000],
    category: "",
    rating: 0
  });

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Use fuzzy search for better typo tolerance
  const { products, loading, error, suggestions: didYouMeanSuggestions } = useFuzzyProductSearch(filters.query);
  
  // Simple filtering and sorting for now
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(filters.category.toLowerCase()));
    }
    
    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }
    
    // Apply price range filter
    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order (relevance)
        break;
    }
    
    return filtered;
  }, [products, filters]);
  
  // Get popular products for no-results fallback
  const { products: popularProducts, isLoading: popularLoading } = useProducts({ 
    limit: 8,
    featured: true 
  });

  // Update URL when search changes
  useEffect(() => {
    if (filters.query) {
      setSearchParams({ q: filters.query });
    } else {
      setSearchParams({});
    }
  }, [filters.query, setSearchParams]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("query", searchInput);
  };

  const clearAllFilters = () => {
    setFilters({
      query: "",
      sortBy: "relevance", 
      priceRange: [0, 1000],
      category: "",
      rating: 0
    });
    setSearchInput("");
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "query" || key === "sortBy") return false;
    if (key === "priceRange") return value[0] !== 0 || value[1] !== 1000;
    if (key === "rating") return value > 0;
    return value !== "" && value !== undefined;
  }).length;

  const searchResults = filteredAndSortedProducts;
  const resultsCount = searchResults.length;
  const isLoading = loading;

  const showNoResults = !isLoading && searchResults.length === 0 && filters.query.length >= 2;
  const showDidYouMean = didYouMeanSuggestions.length > 0 && showNoResults;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {filters.query && (
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">
                Search results for "{filters.query}"
                {!isLoading && <span className="text-muted-foreground text-base ml-2">({resultsCount} found)</span>}
              </h1>
            </div>
          )}

          {/* Did You Mean Suggestions */}
          {showDidYouMean && (
            <div className="mb-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Did you mean:</p>
              <div className="flex flex-wrap gap-2">
                {didYouMeanSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchInput(suggestion);
                      updateFilter("query", suggestion);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.category && (
                <Badge variant="secondary">
                  Category: {filters.category}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilter("category", "")} />
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary">
                  Rating: {filters.rating}+ stars
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilter("rating", 0)} />
                </Badge>
              )}
              {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
                <Badge variant="secondary">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilter("priceRange", [0, 1000])} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{
                  ...product,
                  rating: product.rating || 0,
                  reviews_count: 0,
                  description: product.description || ''
                }}
                viewMode="grid"
                formatPrice={(price: number) => `$${price.toFixed(2)}`}
              />
            ))}
          </div>
        ) : filters.query.length >= 2 ? (
          /* No Results Found */
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching "{filters.query}". Try different keywords or browse our popular products below.
            </p>
            
            {/* Popular Products Fallback */}
            {popularProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h4 className="text-lg font-semibold">Popular Products</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {popularProducts.slice(0, 4).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode="grid"
                      formatPrice={(price: number) => `$${price.toFixed(2)}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <Button variant="outline" className="mt-6" onClick={clearAllFilters}>
              Clear search and show all products
            </Button>
          </div>
        ) : (
          /* Initial State */
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Search for products</h3>
            <p className="text-muted-foreground">Enter a search term to find products</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductSearchPage;