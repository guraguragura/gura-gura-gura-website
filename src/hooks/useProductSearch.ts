
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductSuggestion {
  id: string;
  title: string;
  thumbnail: string;
  handle: string;
}

export const useProductSearch = (query: string) => {
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't search if query is too short
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('product')
          .select('id, title, thumbnail, handle')
          .ilike('title', `%${query}%`)
          .limit(5);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching product suggestions:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch suggestions"));
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search to avoid excessive API calls
    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return { suggestions, loading, error };
};
