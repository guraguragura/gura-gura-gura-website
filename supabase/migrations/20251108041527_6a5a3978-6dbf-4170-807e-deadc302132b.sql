-- Create trigger to automatically create customer record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_customer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert a customer record linked to the new user
  INSERT INTO public.customer (id, email, first_name, last_name, phone, has_account, user_id)
  VALUES (
    gen_random_uuid()::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
    true,
    NEW.id
  )
  ON CONFLICT (email) DO UPDATE
  SET user_id = NEW.id,
      has_account = true;
  
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_customer ON auth.users;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created_customer
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_customer();