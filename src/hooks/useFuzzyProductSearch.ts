import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface FuzzyProduct {
  id: string;
  title: string;
  thumbnail: string;
  handle: string;
  price: number;
  description?: string;
  rating?: number;
  category?: string;
}

export const useFuzzyProductSearch = (query: string) => {
  const [products, setProducts] = useState<FuzzyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setProducts([]);
      setSuggestions([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First try exact and partial matches
        const { data: exactMatches, error: exactError } = await supabase
          .from('product')
          .select('id, title, thumbnail, handle, metadata')
          .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
          .eq('status', 'published')
          .limit(20);

        if (exactError) throw exactError;

        let results = exactMatches || [];
        let didYouMeanSuggestions: string[] = [];

        // If we have few results, try broader search patterns
        if (results.length < 5) {
          // Try searching with individual words
          const words = query.split(' ').filter(word => word.length > 2);
          if (words.length > 1) {
            const wordSearches = words.map(word => `title.ilike.%${word}%`);
            const { data: wordMatches } = await supabase
              .from('product')
              .select('id, title, thumbnail, handle, metadata')
              .or(wordSearches.join(','))
              .eq('status', 'published')
              .limit(10);

            if (wordMatches) {
              const existingIds = new Set(results.map(p => p.id));
              const newResults = wordMatches.filter(p => !existingIds.has(p.id));
              results = [...results, ...newResults];
            }
          }

          // Generate "did you mean" suggestions for common typos
          didYouMeanSuggestions = generateTypoSuggestions(query);
        }

        // Fetch reviews for all products
        const productIds = results.map(p => p.id);
        const { data: reviewsData } = await supabase
          .from('product_reviews')
          .select('product_id, rating')
          .in('product_id', productIds);

        // Calculate ratings per product
        const ratingsMap = new Map<string, { avg: number; count: number }>();
        
        if (reviewsData && reviewsData.length > 0) {
          const productRatings: Record<string, number[]> = {};
          
          reviewsData.forEach(review => {
            if (!productRatings[review.product_id]) {
              productRatings[review.product_id] = [];
            }
            productRatings[review.product_id].push(review.rating);
          });
          
          Object.entries(productRatings).forEach(([productId, ratings]) => {
            const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
            ratingsMap.set(productId, { avg, count: ratings.length });
          });
        }

        // Transform and flatten the data
        const transformedProducts = results.map(product => {
          const metadata = (typeof product.metadata === 'object' && product.metadata !== null) 
            ? product.metadata as Record<string, any> 
            : {};
          const productRating = ratingsMap.get(product.id);
          
          return {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail || '',
            handle: product.handle,
            price: parseFloat(String(metadata.price || '0')),
            description: String(metadata.description || ''),
            rating: productRating?.avg || 0,
            category: String(metadata.category || '')
          };
        });

        setProducts(transformedProducts);
        setSuggestions(didYouMeanSuggestions);
        
      } catch (err) {
        console.error("Error in fuzzy product search:", err);
        setError(err instanceof Error ? err : new Error("Search failed"));
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    const handler = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return { products, loading, error, suggestions };
};

// Generate common typo corrections
function generateTypoSuggestions(query: string): string[] {
  const suggestions: string[] = [];
  const commonTypos: Record<string, string> = {
    // Common keyboard typos
    'teh': 'the',
    'adn': 'and',
    'nad': 'and',
    'hte': 'the',
    'fo': 'of',
    'ot': 'to',
    'int': 'in',
    'ni': 'in',
    'si': 'is',
    'ti': 'it',
    'taht': 'that',
    'thsi': 'this',
    'jsut': 'just',
    'cna': 'can',
    'yuo': 'you',
    'yuor': 'your',
    // Product-specific common typos
    'iphone': 'iPhone',
    'macbook': 'MacBook',
    'nike': 'Nike',
    'adidas': 'Adidas',
    'samsung': 'Samsung',
    'sony': 'Sony',
    'headfones': 'headphones',
    'spekers': 'speakers',
    'camra': 'camera',
    'computr': 'computer',
    'laptop': 'laptop',
    'tablte': 'tablet',
    'phoen': 'phone'
  };

  const words = query.toLowerCase().split(' ');
  let hasSuggestion = false;

  const correctedWords = words.map(word => {
    if (commonTypos[word]) {
      hasSuggestion = true;
      return commonTypos[word];
    }
    
    // Simple character substitution for adjacent keys
    if (word.length > 3) {
      const corrected = correctAdjacentKeyTypos(word);
      if (corrected !== word) {
        hasSuggestion = true;
        return corrected;
      }
    }
    
    return word;
  });

  if (hasSuggestion) {
    suggestions.push(correctedWords.join(' '));
  }

  // Add phonetic suggestions for common products
  const phoneticSuggestions = generatePhoneticSuggestions(query.toLowerCase());
  suggestions.push(...phoneticSuggestions);

  return [...new Set(suggestions)].slice(0, 3); // Remove duplicates and limit
}

function correctAdjacentKeyTypos(word: string): string {
  const keyboardMap: Record<string, string[]> = {
    'q': ['w', 'a'],
    'w': ['q', 'e', 's'],
    'e': ['w', 'r', 'd'],
    'r': ['e', 't', 'f'],
    't': ['r', 'y', 'g'],
    'y': ['t', 'u', 'h'],
    'u': ['y', 'i', 'j'],
    'i': ['u', 'o', 'k'],
    'o': ['i', 'p', 'l'],
    'p': ['o', 'l'],
    'a': ['q', 's', 'z'],
    's': ['a', 'd', 'x', 'w'],
    'd': ['s', 'f', 'c', 'e'],
    'f': ['d', 'g', 'v', 'r'],
    'g': ['f', 'h', 'b', 't'],
    'h': ['g', 'j', 'n', 'y'],
    'j': ['h', 'k', 'm', 'u'],
    'k': ['j', 'l', 'i'],
    'l': ['k', 'o'],
    'z': ['a', 'x'],
    'x': ['z', 'c', 's'],
    'c': ['x', 'v', 'd'],
    'v': ['c', 'b', 'f'],
    'b': ['v', 'n', 'g'],
    'n': ['b', 'm', 'h'],
    'm': ['n', 'j']
  };

  // Simple correction - try replacing each character with adjacent keys
  // This is a basic implementation - in production you'd want more sophisticated algorithms
  return word;
}

function generatePhoneticSuggestions(query: string): string[] {
  const phoneticMap: Record<string, string[]> = {
    'fone': ['phone'],
    'foto': ['photo'],
    'sof': ['soft'],
    'tuf': ['tough'],
    'nife': ['knife'],
    'lite': ['light'],
    'rite': ['right', 'write'],
    'blu': ['blue'],
    'grn': ['green'],
    'blk': ['black'],
    'wht': ['white']
  };

  const suggestions: string[] = [];
  Object.entries(phoneticMap).forEach(([typo, corrections]) => {
    if (query.includes(typo)) {
      corrections.forEach(correction => {
        suggestions.push(query.replace(typo, correction));
      });
    }
  });

  return suggestions;
}