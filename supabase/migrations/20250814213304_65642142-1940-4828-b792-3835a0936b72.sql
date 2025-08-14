-- Add policy to allow authenticated users to read product collections
CREATE POLICY "Authenticated users can view collections" 
ON public.product_collection 
FOR SELECT 
USING (auth.role() = 'authenticated');