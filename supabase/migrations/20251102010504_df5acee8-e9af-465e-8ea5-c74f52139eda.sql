-- Allow anonymous users to view active product categories
CREATE POLICY "product_category_anon_select" 
ON public.product_category
FOR SELECT
TO anon
USING (is_active = true);