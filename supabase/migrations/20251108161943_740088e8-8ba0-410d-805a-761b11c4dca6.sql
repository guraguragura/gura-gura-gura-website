-- Migration to populate category metadata with images and colors
-- This moves hardcoded category images to the database

UPDATE product_category 
SET metadata = jsonb_build_object(
  'image_url', CASE handle
    WHEN 'electronics' THEN '/lovable-uploads/29835d73-aaa6-4a78-902d-7c9805dd79e1.png'
    WHEN 'books' THEN 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
    WHEN 'home-kitchen' THEN 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6'
    WHEN 'fashion' THEN 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    WHEN 'sports-outdoors' THEN '/lovable-uploads/9d63294e-b5da-482e-bab3-e585c3da4015.png'
    WHEN 'health-beauty' THEN '/lovable-uploads/7d883551-ca4e-4d2d-891b-a0f8a17496f7.png'
    WHEN 'kids' THEN '/lovable-uploads/ee7d75cc-e5d9-43fb-9381-a969386ddab7.png'
    WHEN 'car-accessories' THEN '/lovable-uploads/ea338bf4-ab81-449c-b252-6f5c79c8bfad.png'
    WHEN '10k-shop' THEN '/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png'
    WHEN 'home-art' THEN '/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png'
    WHEN 'women' THEN '/lovable-uploads/95be1088-bdc1-4e5f-adf3-f3d8274a774b.png'
    WHEN 'men' THEN '/lovable-uploads/3444a916-c7fa-441c-8ac5-46fff6a723b0.png'
    WHEN 'appliances-kitchen' THEN '/lovable-uploads/92f98a77-737e-4626-8174-6622fef36bb0.png'
    WHEN 'phones-accessories' THEN '/lovable-uploads/9cb8ab96-34b6-412d-8a93-69dd5dacf8c5.png'
    ELSE 'https://images.unsplash.com/photo-1472851294608-062f824d29cc'
  END,
  'background_color', CASE handle
    WHEN 'electronics' THEN 'bg-blue-100'
    WHEN 'books' THEN 'bg-green-100'
    WHEN 'home-kitchen' THEN 'bg-yellow-100'
    WHEN 'fashion' THEN 'bg-purple-100'
    WHEN 'sports-outdoors' THEN 'bg-red-100'
    WHEN 'health-beauty' THEN 'bg-indigo-100'
    WHEN 'kids' THEN 'bg-pink-100'
    WHEN 'car-accessories' THEN 'bg-yellow-200'
    WHEN '10k-shop' THEN 'bg-red-100'
    WHEN 'home-art' THEN 'bg-blue-100'
    WHEN 'women' THEN 'bg-pink-100'
    WHEN 'men' THEN 'bg-blue-200'
    WHEN 'appliances-kitchen' THEN 'bg-yellow-100'
    WHEN 'phones-accessories' THEN 'bg-gray-100'
    ELSE 'bg-gray-100'
  END
)
WHERE handle IN (
  'electronics', 'books', 'home-kitchen', 'fashion', 'sports-outdoors',
  'health-beauty', 'kids', 'car-accessories', '10k-shop', 'home-art',
  'women', 'men', 'appliances-kitchen', 'phones-accessories'
);