import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Collection {
  id: string;
  title: string;
  handle: string;
  metadata?: any;
  productCount: number;
}

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const targetCollections = [
    "10K Shop",
    "This Week's Deals", 
    "Sports & Outdoors",
    "Perfect for Gifting",
    "Customer Top Picks",
    "Back to School"
  ];

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        
        // Fetch collections
        const { data: collectionsData, error: collectionsError } = await supabase
          .from('product_collection')
          .select('id, title, handle, metadata')
          .in('title', targetCollections)
          .order('title');

        if (collectionsError) {
          throw collectionsError;
        }

        // Get product counts for each collection
        const collectionsWithCounts = await Promise.all(
          (collectionsData || []).map(async (collection) => {
            const { count } = await supabase
              .from('product')
              .select('*', { count: 'exact', head: true })
              .eq('collection_id', collection.id);

            return {
              ...collection,
              productCount: count || 0
            };
          })
        );

        setCollections(collectionsWithCounts);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch collections');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, loading, error };
};