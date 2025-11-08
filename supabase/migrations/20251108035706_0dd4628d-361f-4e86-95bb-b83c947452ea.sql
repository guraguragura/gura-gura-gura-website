-- Keep only "The newest" and ensure it has content + placeholder image
BEGIN;

-- Delete all other articles
DELETE FROM public.promotional_articles 
WHERE title <> 'The newest';

-- Update "The newest" with content, author, excerpt, alt text, placeholder image, and publish date
UPDATE public.promotional_articles
SET
  content = '<h2>Introducing Our Latest Innovation</h2><p>We are thrilled to announce the launch of our newest product line, designed to revolutionize the way you shop online. This groundbreaking initiative represents months of research, development, and dedication from our team.</p><h3>Key Features</h3><ul><li>Enhanced user experience with intuitive navigation</li><li>Faster delivery times across all regions</li><li>Expanded product catalog with exclusive items</li><li>Improved customer support available 24/7</li></ul><p>Our commitment to excellence drives us to continuously innovate and improve our services. This launch marks a significant milestone in our journey to become the leading e-commerce platform in the region.</p><p>We invite you to explore these new features and experience the difference for yourself. Thank you for being part of our growing community.</p>',
  author = COALESCE(author, 'Gura Editorial Team'),
  excerpt = 'Discover our latest innovation designed to transform your online shopping experience with enhanced features and improved services.',
  featured_image_alt = COALESCE(featured_image_alt, 'Modern e-commerce platform showcasing innovative shopping features'),
  image_url = COALESCE(image_url, '/lovable-uploads/e3ce3e2d-544e-4626-b3fa-b35dd86d950c.png'),
  is_active = true,
  published_at = COALESCE(published_at, now())
WHERE title = 'The newest';

COMMIT;