-- Allow anonymous users to view product-category relationships
CREATE POLICY "product_category_product_anon_select" 
ON public.product_category_product
FOR SELECT
TO anon
USING (true);