-- Add RLS policy for product_category to restrict updates to admins only
CREATE POLICY "Only admins can update categories"
ON public.product_category
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));