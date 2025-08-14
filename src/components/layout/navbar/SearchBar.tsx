
import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProductSearch, ProductSuggestion } from "@/hooks/useProductSearch";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { suggestions, loading } = useProductSearch(query);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleProductSelect(suggestions[selectedIndex]);
      } else if (query) {
        // Perform standard search with current query
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
      }
    }
    // Escape
    else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleProductSelect = (product: ProductSuggestion) => {
    navigate(`/product/${product.handle}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl relative" ref={searchContainerRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="pl-3 sm:pl-4 pr-8 sm:pr-10 py-1 sm:py-2 text-sm border-2 border-brand-teal rounded-md focus:ring-brand-teal"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
          />
          <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand-teal" />
          </button>
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 sm:max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-2 space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2 p-2">
                  <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-3 sm:h-4 w-3/4" />
                    <Skeleton className="h-2 sm:h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((product, index) => (
                <li 
                  key={product.id}
                  className={`p-1 sm:p-2 flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? 'bg-brand-teal/10' : ''}`}
                  onClick={() => handleProductSelect(product)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {product.thumbnail ? (
                    <img 
                      src={product.thumbnail} 
                      alt={product.title} 
                      className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded flex items-center justify-center">
                      <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">{product.title}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-500">
              <div className="mb-2">No products found</div>
              <div className="text-xs text-gray-400">Try a different search term or</div>
              <button 
                className="text-xs text-brand-teal hover:underline mt-1"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(query)}`);
                  setIsOpen(false);
                }}
              >
                view all search results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
