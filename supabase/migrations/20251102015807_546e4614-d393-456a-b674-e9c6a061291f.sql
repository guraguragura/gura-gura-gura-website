-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create promotional_articles table
CREATE TABLE IF NOT EXISTS public.promotional_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  background_color TEXT DEFAULT 'bg-gray-100',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.promotional_articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active articles
CREATE POLICY "Public can view active promotional articles"
ON public.promotional_articles
FOR SELECT
USING (is_active = true);

-- Allow authenticated users to insert articles
CREATE POLICY "Authenticated users can insert promotional articles"
ON public.promotional_articles
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update articles
CREATE POLICY "Authenticated users can update promotional articles"
ON public.promotional_articles
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete articles
CREATE POLICY "Authenticated users can delete promotional articles"
ON public.promotional_articles
FOR DELETE
TO authenticated
USING (true);

-- Storage policies for article-images bucket
CREATE POLICY "Public can view article images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can update article images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images')
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can delete article images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_promotional_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_promotional_articles_updated_at
BEFORE UPDATE ON public.promotional_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_promotional_articles_updated_at();

-- Seed with existing articles from the hardcoded data
INSERT INTO public.promotional_articles (title, subtitle, image_url, link_url, background_color, display_order)
VALUES 
  ('The newest', 'gadgets at your finger tips', '/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png', '/shop', 'bg-orange-400', 1),
  ('Gear up and dominate:', 'sports gear for every victory', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974', '/shop', 'bg-green-700', 2),
  ('Deal of the week :', 'Get 15% off on amazing headsets!', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb', '/shop', 'bg-yellow-400', 3);