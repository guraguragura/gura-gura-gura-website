import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Banner {
  id: string;
  title: string;
  image_url: string;
  placement: 'hero' | 'promotional' | 'seasonal' | 'featured-promo' | 'trending-promo' | 'top-selling-promo';
  link_type: 'product' | 'category' | 'collection' | 'external' | 'none';
  link_value: string | null;
  display_order: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
}

export const useBanners = (placement?: string) => {
  return useQuery({
    queryKey: ['banners', placement],
    queryFn: async () => {
      let query = supabase
        .from('promotional_banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (placement) {
        query = query.eq('placement', placement);
      }

      // Filter by date range
      const now = new Date().toISOString();
      query = query.or(`start_date.is.null,start_date.lte.${now}`)
                   .or(`end_date.is.null,end_date.gte.${now}`);

      const { data, error } = await query;

      if (error) throw error;
      return data as Banner[];
    },
  });
};

export const getBannerLink = (banner: Banner): string => {
  if (!banner.link_value) return '#';
  
  switch (banner.link_type) {
    case 'product':
      return `/product/${banner.link_value}`;
    case 'category':
      return `/category/${banner.link_value}`;
    case 'collection':
      return `/collections/${banner.link_value}`;
    case 'external':
      return banner.link_value;
    case 'none':
    default:
      return '#';
  }
};