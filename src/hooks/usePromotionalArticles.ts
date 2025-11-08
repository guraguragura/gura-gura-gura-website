import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PromotionalArticle {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  link_url: string;
  background_color: string;
  is_active: boolean;
  published_at: string;
  created_at: string;
  slug: string;
  content: string | null;
  author: string | null;
  excerpt: string | null;
  featured_image_alt: string | null;
}

export const useLatestArticles = (limit: number = 3) => {
  return useQuery({
    queryKey: ["promotional-articles", "latest", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotional_articles")
        .select("*")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as PromotionalArticle[];
    },
  });
};

export const useAllArticles = (page: number = 1, perPage: number = 12) => {
  return useQuery({
    queryKey: ["promotional-articles", "all", page, perPage],
    queryFn: async () => {
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error, count } = await supabase
        .from("promotional_articles")
        .select("*", { count: "exact" })
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { articles: data as PromotionalArticle[], total: count || 0 };
    },
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["promotional-articles", "slug", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotional_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data as PromotionalArticle;
    },
    enabled: !!slug,
  });
};
