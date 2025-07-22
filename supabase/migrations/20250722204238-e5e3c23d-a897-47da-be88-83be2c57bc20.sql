
-- PHASE 1: CRITICAL SECURITY FIXES
-- Fix Security Definer View issues and tighten RLS policies

-- 1. First, let's identify and fix any problematic views with SECURITY DEFINER
-- Drop any existing problematic views and recreate them properly
DROP VIEW IF EXISTS public.security_dashboard;

-- Recreate security dashboard as a proper function instead of a SECURITY DEFINER view
CREATE OR REPLACE FUNCTION public.get_security_dashboard()
RETURNS TABLE(
  metric TEXT,
  value BIGINT,
  period TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'failed_logins'::TEXT as metric,
    COUNT(*)::BIGINT as value,
    'last_hour'::TEXT as period
  FROM public.audit_log 
  WHERE operation = 'login_failed' 
  AND timestamp > NOW() - INTERVAL '1 hour'
  
  UNION ALL
  
  SELECT 
    'rate_limit_violations'::TEXT as metric,
    COUNT(*)::BIGINT as value,
    'last_hour'::TEXT as period
  FROM public.audit_log 
  WHERE operation = 'rate_limit_exceeded' 
  AND timestamp > NOW() - INTERVAL '1 hour'
  
  UNION ALL
  
  SELECT 
    'admin_operations'::TEXT as metric,
    COUNT(*)::BIGINT as value,
    'last_24h'::TEXT as period
  FROM public.audit_log 
  WHERE user_id IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
  )
  AND timestamp > NOW() - INTERVAL '24 hours';
END;
$$;

-- 2. Tighten RLS policies - Remove anonymous access from sensitive tables
-- Keep anonymous access only for public catalog data

-- Update customer table - remove overly permissive policies
DROP POLICY IF EXISTS "customer_public_read" ON public.customer;

-- Ensure customers can only access their own data
CREATE POLICY "customer_authenticated_only" ON public.customer
FOR ALL TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
)
WITH CHECK (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Update cart policies to be more restrictive
DROP POLICY IF EXISTS "public_cart_access" ON public.cart;

-- Ensure only authenticated users can access carts
CREATE POLICY "cart_authenticated_only" ON public.cart
FOR ALL TO authenticated
USING (
  customer_id = (
    SELECT c.id FROM customer c 
    WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
)
WITH CHECK (
  customer_id = (
    SELECT c.id FROM customer c 
    WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

-- Update order table policies
DROP POLICY IF EXISTS "public_order_access" ON public.order;

CREATE POLICY "order_customer_access" ON public.order
FOR SELECT TO authenticated
USING (
  customer_id = (
    SELECT c.id FROM customer c 
    WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

CREATE POLICY "order_driver_access" ON public.order
FOR SELECT TO authenticated
USING (
  driver_id = auth.uid() AND has_role(auth.uid(), 'driver'::app_role)
);

CREATE POLICY "order_admin_access" ON public.order
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add password validation trigger
CREATE OR REPLACE FUNCTION public.validate_password_strength()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This will be handled by Supabase Auth settings, but we add this for completeness
  IF LENGTH(NEW.encrypted_password) < 8 THEN
    RAISE EXCEPTION 'Password must be at least 8 characters long';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 4. Create secure function for user role checking to prevent infinite recursion
CREATE OR REPLACE FUNCTION public.get_user_role_secure(user_uuid UUID)
RETURNS app_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$;

-- Update has_role function to use the secure version
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.get_user_role_secure(_user_id) = _role;
$$;

-- 5. Add session security enhancements
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_sessions" ON public.user_sessions
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 6. Add function to clean expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.user_sessions WHERE expires_at < NOW();
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- 7. Enable additional security constraints
ALTER TABLE public.customer ADD CONSTRAINT customer_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL);

ALTER TABLE public.customer_address ADD CONSTRAINT address_length_check
CHECK (LENGTH(address) <= 500);

-- 8. Create audit function for sensitive operations
CREATE OR REPLACE FUNCTION public.audit_sensitive_operation(
  operation_type TEXT,
  table_name TEXT,
  record_id TEXT,
  details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_log (
    table_name,
    operation,
    new_data,
    user_id,
    ip_address,
    timestamp
  ) VALUES (
    table_name,
    operation_type,
    jsonb_build_object(
      'record_id', record_id,
      'details', details,
      'severity', 'high'
    ),
    auth.uid(),
    inet_client_addr(),
    NOW()
  );
END;
$$;
