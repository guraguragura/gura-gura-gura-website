import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdvancedProductFilters {
  query?: string;
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  brand?: string;
  color?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popularity';
}

export interface FilterableProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews_count: number;
  handle: string;
  brand?: string;
  color?: string;
  category?: string;
  created_at: string;
  popularity_score?: number;
}

export const useAdvancedProductSearch = (filters: AdvancedProductFilters = {}) => {
  const [products, setProducts] = useState<FilterableProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Memoize filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(product => {
        const price = product.discount_price || product.price;
        return price >= min && price <= max;
      });
    }

    if (filters.rating) {
      result = result.filter(product => product.rating >= filters.rating!);
    }

    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }

    if (filters.color) {
      result = result.filter(product => product.color === filters.color);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          result.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
          break;
        case 'price_desc':
          result.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'popularity':
          result.sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));
          break;
      }
    }

    return result;
  }, [products, filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase
          .from('product')
          .select('id, title, description, price, discount_price, thumbnail, images, rating, reviews_count, handle, brand, color, category, created_at, popularity_score');

        // Only apply database-level filters for efficiency
        if (filters.category) {
          query = query.eq('category', filters.category);
        }

        const { data, error, count } = await query;
        
        if (error) {
          throw new Error(error.message);
        }
        
        setProducts(data || []);
        setTotalCount(count || 0);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.category]); // Only refetch when category changes

  return { 
    products: filteredProducts, 
    loading, 
    error, 
    totalCount: filteredProducts.length,
    allProductsCount: totalCount
  };
};