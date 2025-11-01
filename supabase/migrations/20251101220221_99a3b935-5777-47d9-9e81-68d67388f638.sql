-- Fix customer table RLS policies to prevent unauthorized access
-- Drop the existing permissive policies and replace with stricter ones

-- Drop existing policies
DROP POLICY IF EXISTS "customer_select_own" ON customer;
DROP POLICY IF EXISTS "customer_insert_own" ON customer;
DROP POLICY IF EXISTS "customer_update_own" ON customer;
DROP POLICY IF EXISTS "customer_admin_all" ON customer;

-- Ensure the customer table has a user_id column to link to auth.users
-- This should already exist, but if not, we need to add it
-- First check if user_id column exists, if not add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE customer ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Create strict RLS policies
-- Admin full access
CREATE POLICY "customer_admin_full_access" 
ON customer 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Users can only view their own customer record
CREATE POLICY "customer_select_own_only" 
ON customer 
FOR SELECT 
USING (
  -- Match by email from auth.users
  email = (SELECT users.email FROM auth.users WHERE users.id = auth.uid())
  OR
  -- Or match by user_id if it exists
  user_id = auth.uid()
);

-- Users can insert their own customer record
CREATE POLICY "customer_insert_own_only" 
ON customer 
FOR INSERT 
WITH CHECK (
  email = (SELECT users.email FROM auth.users WHERE users.id = auth.uid())
  OR
  user_id = auth.uid()
);

-- Users can update their own customer record
CREATE POLICY "customer_update_own_only" 
ON customer 
FOR UPDATE 
USING (
  email = (SELECT users.email FROM auth.users WHERE users.id = auth.uid())
  OR
  user_id = auth.uid()
);

-- Add audit logging trigger for customer table access
CREATE OR REPLACE FUNCTION log_customer_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    table_name,
    operation,
    user_id,
    old_data,
    new_data,
    ip_address,
    user_agent
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for customer table
DROP TRIGGER IF EXISTS customer_audit_trigger ON customer;
CREATE TRIGGER customer_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON customer
  FOR EACH ROW
  EXECUTE FUNCTION log_customer_access();