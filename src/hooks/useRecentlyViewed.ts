import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gura_recently_viewed';
const MAX_ITEMS = 20;

export interface RecentlyViewedProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  viewedAt: string;
  category?: string;
}

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(parsed);
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
  };

  const addToRecentlyViewed = (product: Omit<RecentlyViewedProduct, 'viewedAt'>) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let items: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists
      items = items.filter(item => item.id !== product.id);
      
      // Add to beginning
      items.unshift({
        ...product,
        viewedAt: new Date().toISOString()
      });
      
      // Keep only MAX_ITEMS
      items = items.slice(0, MAX_ITEMS);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setRecentlyViewed(items);
    } catch (error) {
      console.error('Error saving to recently viewed:', error);
    }
  };

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (error) {
      console.error('Error clearing recently viewed:', error);
    }
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};

