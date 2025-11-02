-- Seed initial press releases from the hardcoded PressPage data
INSERT INTO promotional_articles (
  title,
  subtitle,
  image_url,
  link_url,
  background_color,
  is_active,
  published_at,
  display_order
) VALUES
(
  'Gura Expands Operations to Eastern Province',
  'Following strong growth in Kigali and other major cities, Gura''s e-commerce services are now available across Rwanda''s Eastern Province.',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
  '/press',
  '#1e40af',
  true,
  '2023-05-15T09:00:00Z',
  1
),
(
  'Gura Secures $5M in Series A Funding',
  'The investment will accelerate growth and development of the platform''s technology infrastructure.',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
  '/press',
  '#047857',
  true,
  '2023-03-02T10:00:00Z',
  2
),
(
  'Gura Launches Express Delivery in Kigali',
  'New 2-hour delivery service now available for select products within Kigali city limits.',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop',
  '/press',
  '#7c3aed',
  true,
  '2022-12-10T08:00:00Z',
  3
),
(
  'Gura Partners with Major Telecom for Mobile Payments',
  'Strategic partnership enhances mobile payment options for customers across Rwanda.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  '/press',
  '#dc2626',
  true,
  '2022-10-05T11:00:00Z',
  4
);