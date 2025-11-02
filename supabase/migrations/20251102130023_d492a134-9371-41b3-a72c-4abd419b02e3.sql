-- Fix mpath for 10k subcategory test to correctly link to parent category
UPDATE product_category 
SET mpath = 'pcat_01JQA4ZGC763GP9M3RBFYP09MS.pcat_01K92A5AWMJ854C36AYX7XRSNB'
WHERE id = 'pcat_01K92A5AWMJ854C36AYX7XRSNB' 
  AND name = '10k subcategory test';