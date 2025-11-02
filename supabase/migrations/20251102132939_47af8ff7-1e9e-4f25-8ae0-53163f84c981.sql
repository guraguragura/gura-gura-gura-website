-- Delete unwanted categories
DELETE FROM product_category 
WHERE id IN (
  'pcat_01K927TCA8BQM7S6H52VFG99SH',  -- Shirts
  'pcat_01K927TCK0F348QB76Q028ZSVM',  -- Sweatshirts
  'pcat_01K927TCVTXKNK09KF5G2PHHHD',  -- Pants
  'pcat_01K927TD4V5Z4K1063J514V09G'   -- Merch
);