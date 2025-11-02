-- Drop the restrictive policy that requires authentication
DROP POLICY IF EXISTS "product_public_select" ON product;

-- Create a new policy that allows both authenticated and anonymous users to view published products
CREATE POLICY "Enable read access for published products"
ON product
FOR SELECT
USING (
  status = 'published'
  OR has_role(auth.uid(), 'admin'::app_role)
);