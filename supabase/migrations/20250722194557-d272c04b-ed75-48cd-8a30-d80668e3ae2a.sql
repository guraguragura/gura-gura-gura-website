
-- Add geocoding fields to customer_address table
ALTER TABLE public.customer_address ADD COLUMN IF NOT EXISTS latitude numeric;
ALTER TABLE public.customer_address ADD COLUMN IF NOT EXISTS longitude numeric;
ALTER TABLE public.customer_address ADD COLUMN IF NOT EXISTS geocoded_address text;
ALTER TABLE public.customer_address ADD COLUMN IF NOT EXISTS is_location_confirmed boolean DEFAULT false;

-- Add geocoding fields to cart_address table for checkout flow
ALTER TABLE public.cart_address ADD COLUMN IF NOT EXISTS latitude numeric;
ALTER TABLE public.cart_address ADD COLUMN IF NOT EXISTS longitude numeric;
ALTER TABLE public.cart_address ADD COLUMN IF NOT EXISTS geocoded_address text;
ALTER TABLE public.cart_address ADD COLUMN IF NOT EXISTS is_location_confirmed boolean DEFAULT false;

-- Add indexes for better performance on location queries
CREATE INDEX IF NOT EXISTS idx_customer_address_location ON public.customer_address (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_cart_address_location ON public.cart_address (latitude, longitude);
