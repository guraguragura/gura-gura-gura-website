
-- Create driver profiles table
CREATE TABLE public.driver_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  driver_license TEXT,
  vehicle_type TEXT DEFAULT 'motorbike',
  is_active BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT false,
  current_location JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add driver_id to order table
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES public.driver_profiles(id);

-- Create extended order status enum for delivery tracking
CREATE TYPE delivery_status_enum AS ENUM (
  'pending',
  'confirmed', 
  'ready_for_pickup',
  'assigned_to_driver',
  'picked_up',
  'out_for_delivery', 
  'delivered',
  'cancelled'
);

-- Add delivery status and timestamps to order table
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS delivery_status delivery_status_enum DEFAULT 'pending';
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS picked_up_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;

-- Enable RLS on driver_profiles
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for driver_profiles
CREATE POLICY "Drivers can view their own profile" 
  ON public.driver_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Drivers can update their own profile" 
  ON public.driver_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Service can create driver profiles" 
  ON public.driver_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for orders (driver access)
CREATE POLICY "Drivers can view unassigned orders or their own orders" 
  ON public.order 
  FOR SELECT 
  TO authenticated
  USING (
    driver_id IS NULL AND delivery_status = 'ready_for_pickup'
    OR 
    driver_id IN (SELECT id FROM public.driver_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Drivers can update their assigned orders" 
  ON public.order 
  FOR UPDATE 
  TO authenticated
  USING (
    driver_id IN (SELECT id FROM public.driver_profiles WHERE user_id = auth.uid())
  );

-- Create indexes for better performance
CREATE INDEX idx_orders_delivery_status ON public.order(delivery_status);
CREATE INDEX idx_orders_driver_id ON public.order(driver_id);
CREATE INDEX idx_driver_profiles_user_id ON public.driver_profiles(user_id);
CREATE INDEX idx_driver_profiles_is_available ON public.driver_profiles(is_available);

-- Create function to automatically create driver profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_driver()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'user_type' = 'driver' THEN
    INSERT INTO public.driver_profiles (
      user_id, 
      first_name, 
      last_name, 
      phone, 
      email
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
      COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone'),
      COALESCE(NEW.email, NEW.raw_user_meta_data->>'email')
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to create driver profile when driver signs up
CREATE TRIGGER on_auth_driver_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_driver();
