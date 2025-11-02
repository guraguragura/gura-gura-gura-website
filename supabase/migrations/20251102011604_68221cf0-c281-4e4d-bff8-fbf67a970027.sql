-- Allow anonymous users to view product tags
CREATE POLICY "product_tag_anon_select" 
ON public.product_tag
FOR SELECT
TO anon
USING (true);

-- Allow anonymous users to view product-tag relationships
CREATE POLICY "product_tags_anon_select" 
ON public.product_tags
FOR SELECT
TO anon
USING (true);