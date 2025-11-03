UPDATE product 
SET metadata = jsonb_build_object(
  'price', 29.99,
  'discount_price', 24.99,
  'rating', 4.8,
  'reviews_count', 45,
  'in_stock', true,
  'sku', 'WBKGL2025',
  'is_sale', true,
  'is_new', true,
  'images', jsonb_build_array(
    'http://localhost:9000/static/1760556205480-test%20product.png',
    'http://localhost:9000/static/1760556205480-test%20product.png',
    'http://localhost:9000/static/1760556205480-test%20product.png'
  ),
  'specifications', jsonb_build_object(
    'Material', 'Stainless Steel',
    'Capacity', '750ml',
    'Color', 'Black with Rwandan Flag Design',
    'Features', 'Double-walled insulation',
    'Theme', 'Kigali 2025 Celebration'
  ),
  'features', jsonb_build_array(
    'Double-walled vacuum insulation',
    'Keeps drinks hot for 12 hours, cold for 24 hours',
    'BPA-free and leak-proof',
    'Rwandan flag colors with cyclist emblem',
    'Perfect for sports, travel, and daily use',
    'Commemorative Kigali 2025 design'
  )
)
WHERE id = 'prod_01K7MN7JKGGND5054KXYZNRRAQ';