-- Create promotional_banners table
CREATE TABLE IF NOT EXISTS public.promotional_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  placement TEXT NOT NULL CHECK (placement IN ('hero', 'promotional', 'seasonal', 'featured-promo', 'trending-promo', 'top-selling-promo')),
  link_type TEXT NOT NULL CHECK (link_type IN ('product', 'category', 'collection', 'external', 'none')),
  link_value TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for active banners by placement
CREATE INDEX idx_promotional_banners_placement_active ON public.promotional_banners(placement, is_active, display_order);

-- Create index for date filtering
CREATE INDEX idx_promotional_banners_dates ON public.promotional_banners(start_date, end_date);

-- Enable RLS
ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active banners
CREATE POLICY "Anyone can view active banners" 
ON public.promotional_banners 
FOR SELECT 
USING (is_active = true);

-- Policy: Authenticated users can view all banners (for admin)
CREATE POLICY "Authenticated users can view all banners" 
ON public.promotional_banners 
FOR SELECT 
TO authenticated
USING (true);

-- Policy: Authenticated users can insert banners
CREATE POLICY "Authenticated users can insert banners" 
ON public.promotional_banners 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated users can update banners
CREATE POLICY "Authenticated users can update banners" 
ON public.promotional_banners 
FOR UPDATE 
TO authenticated
USING (true);

-- Policy: Authenticated users can delete banners
CREATE POLICY "Authenticated users can delete banners" 
ON public.promotional_banners 
FOR DELETE 
TO authenticated
USING (true);

-- Create storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for banner images
CREATE POLICY "Anyone can view banner images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'banner-images');

CREATE POLICY "Authenticated users can upload banner images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'banner-images');

CREATE POLICY "Authenticated users can update banner images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'banner-images');

CREATE POLICY "Authenticated users can delete banner images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'banner-images');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_promotional_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_promotional_banners_updated_at
BEFORE UPDATE ON public.promotional_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_promotional_banners_updated_at();