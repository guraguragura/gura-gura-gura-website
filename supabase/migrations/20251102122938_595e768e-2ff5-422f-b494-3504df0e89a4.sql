-- Remove hardcoded rating and reviews_count from product metadata
-- This ensures all products use dynamic review data from product_reviews table

UPDATE product 
SET metadata = metadata - 'rating' - 'reviews_count'
WHERE metadata ? 'rating' OR metadata ? 'reviews_count';