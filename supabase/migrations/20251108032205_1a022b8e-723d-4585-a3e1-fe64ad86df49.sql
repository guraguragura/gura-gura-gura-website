-- Drop the existing function
DROP FUNCTION IF EXISTS get_related_products(uuid);

-- Recreate the function with actual review data
CREATE OR REPLACE FUNCTION get_related_products(current_product_id uuid)
RETURNS TABLE (
  id uuid,
  title text,
  thumbnail text,
  price numeric,
  discount_price numeric,
  rating numeric,
  reviews_count bigint,
  is_sale boolean,
  is_new boolean
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.thumbnail,
    COALESCE((p.metadata->>'price')::numeric, 0) as price,
    CASE 
      WHEN p.metadata->>'discount_price' IS NOT NULL 
      THEN (p.metadata->>'discount_price')::numeric 
      ELSE NULL 
    END as discount_price,
    COALESCE(AVG(pr.rating), 0) as rating,
    COUNT(pr.id) as reviews_count,
    COALESCE((p.metadata->>'is_sale')::boolean, false) as is_sale,
    COALESCE((p.metadata->>'is_new')::boolean, false) as is_new
  FROM product p
  LEFT JOIN product_reviews pr ON pr.product_id = p.id
  WHERE p.id != current_product_id
    AND p.status = 'published'
  GROUP BY p.id, p.title, p.thumbnail, p.metadata
  ORDER BY RANDOM()
  LIMIT 4;
END;
$$;