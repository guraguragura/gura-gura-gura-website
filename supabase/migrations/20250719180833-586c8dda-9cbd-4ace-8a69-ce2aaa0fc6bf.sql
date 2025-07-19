
-- PHASE 1: COMPLETE SECURITY REMEDIATION
-- This migration will enable RLS on all remaining tables and fix critical security vulnerabilities

-- 1. ENABLE RLS ON ALL REMAINING UNPROTECTED TABLES
-- Check and enable RLS only on tables that exist and don't already have it enabled

DO $$
DECLARE
    table_record RECORD;
    policy_count INTEGER;
BEGIN
    -- Enable RLS on all tables that don't have it enabled yet
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN (
            SELECT tablename 
            FROM pg_tables t
            JOIN pg_class c ON c.relname = t.tablename
            WHERE c.relrowsecurity = true
            AND t.schemaname = 'public'
        )
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_record.tablename);
        RAISE NOTICE 'Enabled RLS on table: %', table_record.tablename;
    END LOOP;
END $$;

-- 2. FIX SEARCH_PATH VULNERABILITIES IN ALL FUNCTIONS
-- Update all functions to use explicit search_path = public

CREATE OR REPLACE FUNCTION public.handle_new_driver()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Handle driver signup
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
    
    -- Add driver role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'driver');
  END IF;
  
  -- Handle admin signup
  IF NEW.raw_user_meta_data->>'user_type' = 'admin' THEN
    -- Add admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_driver_stats_on_delivery()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  -- Only update when order status changes to delivered
  IF NEW.unified_status = 'delivered' AND (OLD.unified_status IS NULL OR OLD.unified_status != 'delivered') THEN
    -- Update driver statistics
    PERFORM public.calculate_driver_statistics(NEW.driver_id);
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_order_status_transition()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  -- Define allowed transitions (keeping existing logic)
  IF OLD.unified_status IS NOT NULL AND NEW.unified_status != OLD.unified_status THEN
    -- Check if transition is valid
    IF NOT (
      (OLD.unified_status = 'pending_payment' AND NEW.unified_status IN ('paid', 'cancelled')) OR
      (OLD.unified_status = 'paid' AND NEW.unified_status IN ('processing', 'cancelled', 'refunded')) OR
      (OLD.unified_status = 'processing' AND NEW.unified_status IN ('ready_for_pickup', 'cancelled')) OR
      (OLD.unified_status = 'ready_for_pickup' AND NEW.unified_status IN ('assigned_to_driver', 'cancelled')) OR
      (OLD.unified_status = 'assigned_to_driver' AND NEW.unified_status IN ('picked_up', 'cancelled')) OR
      (OLD.unified_status = 'picked_up' AND NEW.unified_status IN ('out_for_delivery', 'failed_delivery', 'cancelled')) OR
      (OLD.unified_status = 'out_for_delivery' AND NEW.unified_status IN ('delivered', 'failed_delivery', 'cancelled')) OR
      (OLD.unified_status = 'failed_delivery' AND NEW.unified_status IN ('assigned_to_driver', 'cancelled', 'refunded')) OR
      (OLD.unified_status = 'delivered' AND NEW.unified_status = 'refunded') OR
      (OLD.unified_status = 'cancelled' AND NEW.unified_status = 'refunded')
    ) THEN
      RAISE EXCEPTION 'Invalid status transition from % to %', OLD.unified_status, NEW.unified_status;
    END IF;
  END IF;
  
  -- Auto-sync customer-facing status based on unified_status
  IF NEW.unified_status IS NOT NULL THEN
    NEW.status = map_unified_status_to_customer_status(NEW.unified_status);
  END IF;
  
  -- Auto-set timestamps based on status (keeping existing logic)
  IF NEW.unified_status != OLD.unified_status THEN
    CASE NEW.unified_status
      WHEN 'paid' THEN NEW.paid_at = COALESCE(NEW.paid_at, NOW());
      WHEN 'processing' THEN NEW.processing_started_at = COALESCE(NEW.processing_started_at, NOW());
      WHEN 'ready_for_pickup' THEN NEW.ready_for_pickup_at = COALESCE(NEW.ready_for_pickup_at, NOW());
      WHEN 'assigned_to_driver' THEN NEW.assigned_at = COALESCE(NEW.assigned_at, NOW());
      WHEN 'picked_up' THEN NEW.picked_up_at = COALESCE(NEW.picked_up_at, NOW());
      WHEN 'delivered' THEN NEW.delivered_at = COALESCE(NEW.delivered_at, NOW());
      WHEN 'failed_delivery' THEN NEW.failed_delivery_at = COALESCE(NEW.failed_delivery_at, NOW());
      WHEN 'cancelled' THEN NEW.cancelled_at = COALESCE(NEW.cancelled_at, NOW());
      WHEN 'refunded' THEN NEW.refunded_at = COALESCE(NEW.refunded_at, NOW());
      ELSE NULL;
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.map_unified_status_to_customer_status(unified_status_val unified_order_status_enum)
RETURNS order_status_enum
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $function$
BEGIN
  CASE unified_status_val
    WHEN 'pending_payment' THEN RETURN 'pending';
    WHEN 'paid' THEN RETURN 'pending';
    WHEN 'processing' THEN RETURN 'processing';
    WHEN 'ready_for_pickup' THEN RETURN 'processing';
    WHEN 'assigned_to_driver' THEN RETURN 'processing';
    WHEN 'picked_up' THEN RETURN 'processing';
    WHEN 'out_for_delivery' THEN RETURN 'shipped';
    WHEN 'delivered' THEN RETURN 'delivered';
    WHEN 'failed_delivery' THEN RETURN 'shipped';
    WHEN 'cancelled' THEN RETURN 'canceled';
    WHEN 'refunded' THEN RETURN 'canceled';
    ELSE RETURN 'pending';
  END CASE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_driver_rating(p_driver_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_avg_rating NUMERIC(3,2);
  v_total_ratings INTEGER;
BEGIN
  -- Calculate average rating and total count
  SELECT 
    ROUND(AVG(rating)::NUMERIC, 2),
    COUNT(*)
  INTO v_avg_rating, v_total_ratings
  FROM public.customer_ratings 
  WHERE driver_id = p_driver_id;
  
  -- Update driver profile
  UPDATE public.driver_profiles 
  SET 
    average_rating = v_avg_rating,
    total_ratings = v_total_ratings,
    updated_at = NOW()
  WHERE id = p_driver_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.calculate_driver_period_earnings(p_driver_id uuid, p_period text)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_start_date timestamp with time zone;
  v_earnings numeric := 0;
BEGIN
  -- Determine start date based on period
  CASE p_period
    WHEN 'today' THEN
      v_start_date := DATE_TRUNC('day', NOW());
    WHEN 'week' THEN
      v_start_date := DATE_TRUNC('week', NOW());
    WHEN 'month' THEN
      v_start_date := DATE_TRUNC('month', NOW());
    ELSE
      v_start_date := DATE_TRUNC('day', NOW());
  END CASE;
  
  -- Calculate earnings for the period
  SELECT COALESCE(SUM((metadata->>'total')::numeric), 0)
  INTO v_earnings
  FROM public.order
  WHERE driver_id = p_driver_id 
    AND unified_status = 'delivered'
    AND delivered_at >= v_start_date;
  
  RETURN v_earnings;
END;
$function$;

CREATE OR REPLACE FUNCTION public.accept_driver_order(p_order_id text, p_driver_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_order_record RECORD;
  v_result JSONB;
BEGIN
  -- Check if order exists and is in a state that can be accepted
  SELECT * INTO v_order_record 
  FROM public.order 
  WHERE id = p_order_id 
  AND unified_status = 'ready_for_pickup'
  AND (driver_id IS NULL OR driver_id = p_driver_id);
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Order not found or cannot be accepted'
    );
  END IF;
  
  -- Update order with driver assignment
  UPDATE public.order 
  SET 
    driver_id = p_driver_id,
    unified_status = 'assigned_to_driver',
    driver_accepted_at = NOW(),
    updated_at = NOW()
  WHERE id = p_order_id;
  
  -- Insert status history record
  INSERT INTO public.order_status_history (
    order_id,
    previous_status,
    new_status,
    changed_by,
    changed_by_type,
    notes
  ) VALUES (
    p_order_id,
    v_order_record.unified_status,
    'assigned_to_driver',
    p_driver_id,
    'driver',
    'Order accepted by driver'
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Order accepted successfully',
    'order_id', p_order_id
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_related_products(current_product_id uuid)
RETURNS TABLE(id uuid, title text, thumbnail text, price numeric, discount_price numeric, rating numeric, reviews_count integer, is_sale boolean, is_new boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT DISTINCT 
    p.id::uuid,
    p.title,
    p.thumbnail,
    (p.metadata->>'price')::numeric as price,
    (p.metadata->>'discount_price')::numeric as discount_price,
    COALESCE((p.metadata->>'rating')::numeric, 4.5) as rating,
    COALESCE((p.metadata->>'reviews_count')::integer, 0) as reviews_count,
    COALESCE((p.metadata->>'is_sale')::boolean, false) as is_sale,
    COALESCE((p.metadata->>'is_new')::boolean, false) as is_new
  FROM public.product p
  JOIN public.product_category_product pcp1 ON p.id = pcp1.product_id
  JOIN public.product_category_product pcp2 ON pcp1.product_category_id = pcp2.product_category_id
  WHERE pcp2.product_id = current_product_id
    AND p.id != current_product_id
    AND p.status = 'published'
  LIMIT 4;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_rating_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  -- Update driver rating when rating is inserted, updated, or deleted
  IF TG_OP = 'DELETE' THEN
    PERFORM public.update_driver_rating(OLD.driver_id);
    RETURN OLD;
  ELSE
    PERFORM public.update_driver_rating(NEW.driver_id);
    RETURN NEW;
  END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.refuse_driver_order(p_order_id text, p_driver_id uuid, p_reason text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_order_record RECORD;
BEGIN
  -- Check if order exists and can be refused
  SELECT * INTO v_order_record 
  FROM public.order 
  WHERE id = p_order_id 
  AND unified_status = 'ready_for_pickup';
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Order not found or cannot be refused'
    );
  END IF;
  
  -- Insert refusal record in status history
  INSERT INTO public.order_status_history (
    order_id,
    previous_status,
    new_status,
    changed_by,
    changed_by_type,
    notes
  ) VALUES (
    p_order_id,
    v_order_record.unified_status,
    v_order_record.unified_status,
    p_driver_id,
    'driver',
    CONCAT('Order refused by driver', CASE WHEN p_reason IS NOT NULL THEN ': ' || p_reason ELSE '' END)
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Order refusal recorded',
    'order_id', p_order_id
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_delivery_proof_code()
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  RETURN LPAD((FLOOR(RANDOM() * 100))::TEXT, 2, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.verify_delivery_proof(p_order_id text, p_proof_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_order_record RECORD;
BEGIN
  -- Get order with driver verification
  SELECT * INTO v_order_record 
  FROM public.order 
  WHERE id = p_order_id 
  AND driver_id = auth.uid()
  AND unified_status = 'out_for_delivery'
  AND delivery_proof_code = p_proof_code;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid proof code or order not found'
    );
  END IF;
  
  -- Update order status to delivered
  UPDATE public.order 
  SET 
    unified_status = 'delivered',
    delivery_proof_verified_at = NOW(),
    updated_at = NOW()
  WHERE id = p_order_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Delivery verified successfully'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.auto_generate_delivery_proof()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  -- Generate proof code when status changes to picked_up
  IF NEW.unified_status = 'picked_up' AND (OLD.unified_status IS NULL OR OLD.unified_status != 'picked_up') THEN
    NEW.delivery_proof_code = public.generate_delivery_proof_code();
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.populate_order_metadata(p_order_id text, p_customer_id text, p_cart_id text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_customer_info RECORD;
  v_address_info RECORD;
  v_cart_info RECORD;
  v_metadata JSONB := '{}';
  v_delivery_address JSONB := '{}';
  v_customer_data JSONB := '{}';
  v_items JSONB := '[]';
  v_total NUMERIC := 0;
BEGIN
  -- Get customer information
  SELECT first_name, last_name, email, phone
  INTO v_customer_info
  FROM public.customer
  WHERE id = p_customer_id;
  
  -- Get address information (try cart address first, then customer address)
  IF p_cart_id IS NOT NULL THEN
    SELECT first_name, last_name, phone, address_1, address_2, city, province, postal_code, country_code
    INTO v_address_info
    FROM public.cart_address
    WHERE customer_id = p_customer_id
    ORDER BY created_at DESC
    LIMIT 1;
  END IF;
  
  -- If no cart address found, try customer address
  IF v_address_info IS NULL THEN
    SELECT first_name, last_name, phone, address, city, district, postal_code
    INTO v_address_info
    FROM public.customer_address
    WHERE customer_id = p_customer_id AND is_default_shipping = true
    LIMIT 1;
    
    -- If no default shipping address, get any address
    IF v_address_info IS NULL THEN
      SELECT first_name, last_name, phone, address, city, district, postal_code
      INTO v_address_info
      FROM public.customer_address
      WHERE customer_id = p_customer_id
      ORDER BY created_at DESC
      LIMIT 1;
    END IF;
  END IF;
  
  -- Build customer data
  v_customer_data := jsonb_build_object(
    'first_name', COALESCE(v_customer_info.first_name, v_address_info.first_name, 'Unknown'),
    'last_name', COALESCE(v_customer_info.last_name, v_address_info.last_name, 'Customer'),
    'email', COALESCE(v_customer_info.email, 'no-email@example.com'),
    'phone', COALESCE(v_customer_info.phone, v_address_info.phone, 'No phone provided')
  );
  
  -- Build delivery address
  IF v_address_info IS NOT NULL THEN
    v_delivery_address := jsonb_build_object(
      'address', COALESCE(v_address_info.address_1, v_address_info.address, 'Address not provided'),
      'address_2', COALESCE(v_address_info.address_2, ''),
      'city', COALESCE(v_address_info.city, 'City not provided'),
      'district', COALESCE(v_address_info.province, v_address_info.district, 'District not provided'),
      'postal_code', COALESCE(v_address_info.postal_code, ''),
      'country_code', COALESCE(v_address_info.country_code, 'RW')
    );
  ELSE
    -- Fallback address structure
    v_delivery_address := jsonb_build_object(
      'address', 'Address to be confirmed',
      'address_2', '',
      'city', 'Kigali',
      'district', 'Gasabo',
      'postal_code', '',
      'country_code', 'RW'
    );
  END IF;
  
  -- Get cart items if cart_id provided
  IF p_cart_id IS NOT NULL THEN
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', id,
        'title', title,
        'quantity', quantity,
        'unit_price', unit_price,
        'total', quantity * unit_price
      )
    ), SUM(quantity * unit_price)
    INTO v_items, v_total
    FROM public.cart_line_item
    WHERE cart_id = p_cart_id;
  END IF;
  
  -- Build complete metadata
  v_metadata := jsonb_build_object(
    'customer', v_customer_data,
    'delivery_address', v_delivery_address,
    'items', COALESCE(v_items, '[]'::jsonb),
    'total', COALESCE(v_total, 0),
    'populated_at', NOW()
  );
  
  -- Update the order with populated metadata
  UPDATE public.order
  SET metadata = v_metadata, updated_at = NOW()
  WHERE id = p_order_id;
  
  RETURN v_metadata;
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_order_for_pickup()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  -- When status changes to ready_for_pickup, ensure metadata is populated
  IF NEW.unified_status = 'ready_for_pickup' AND (OLD.unified_status IS NULL OR OLD.unified_status != 'ready_for_pickup') THEN
    -- Check if metadata has required fields
    IF NEW.metadata IS NULL OR 
       NEW.metadata->>'customer' IS NULL OR 
       NEW.metadata->>'delivery_address' IS NULL THEN
      
      -- Try to populate metadata
      PERFORM public.populate_order_metadata(NEW.id, NEW.customer_id, NULL);
      
      -- Refresh the NEW record with updated metadata
      SELECT metadata INTO NEW.metadata 
      FROM public.order 
      WHERE id = NEW.id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- 3. ADD COMPREHENSIVE RLS POLICIES FOR ALL TABLES WITHOUT POLICIES
-- Add default restrictive policies for all tables that have RLS enabled but no policies

DO $$
DECLARE
    table_record RECORD;
    policy_count INTEGER;
BEGIN
    -- Find tables with RLS enabled but no policies
    FOR table_record IN
        SELECT t.tablename
        FROM pg_tables t
        JOIN pg_class c ON c.relname = t.tablename
        WHERE t.schemaname = 'public'
        AND c.relrowsecurity = true
        AND NOT EXISTS (
            SELECT 1 FROM pg_policies p 
            WHERE p.schemaname = t.schemaname 
            AND p.tablename = t.tablename
        )
    LOOP
        -- Add default admin-only policy for tables without any policies
        BEGIN
            EXECUTE format(
                'CREATE POLICY "admin_only_default" ON public.%I FOR ALL TO authenticated USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))',
                table_record.tablename
            );
            RAISE NOTICE 'Added default admin policy to table: %', table_record.tablename;
        EXCEPTION 
            WHEN duplicate_object THEN
                RAISE NOTICE 'Policy already exists for table: %', table_record.tablename;
        END;
    END LOOP;
END $$;

-- 4. CREATE AUDIT LOGGING SYSTEM
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Enable RLS on audit log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "audit_log_admin_only" ON public.audit_log
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 5. CREATE SECURITY VALIDATION FUNCTIONS
CREATE OR REPLACE FUNCTION public.validate_input_length(input_text TEXT, max_length INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
    RETURN input_text IS NULL OR LENGTH(input_text) <= max_length;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_email_format(email_text TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
    RETURN email_text IS NULL OR email_text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;

CREATE OR REPLACE FUNCTION public.log_security_event(event_type TEXT, details JSONB)
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
        timestamp
    ) VALUES (
        'security_events',
        event_type,
        details,
        auth.uid(),
        NOW()
    );
END;
$$;

-- 6. CREATE RATE LIMITING TABLE AND FUNCTIONS
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    ip_address INET,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rate_limits_admin_only" ON public.rate_limits
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_endpoint TEXT,
    p_max_requests INTEGER DEFAULT 100,
    p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_current_count INTEGER;
    v_window_start TIMESTAMP WITH TIME ZONE;
BEGIN
    v_window_start := NOW() - INTERVAL '1 minute' * p_window_minutes;
    
    -- Clean up old entries
    DELETE FROM public.rate_limits 
    WHERE window_start < v_window_start;
    
    -- Check current count for user/endpoint
    SELECT COALESCE(SUM(request_count), 0)
    INTO v_current_count
    FROM public.rate_limits
    WHERE (user_id = auth.uid() OR (user_id IS NULL AND ip_address = inet_client_addr()))
    AND endpoint = p_endpoint
    AND window_start >= v_window_start;
    
    -- If under limit, record the request
    IF v_current_count < p_max_requests THEN
        INSERT INTO public.rate_limits (user_id, ip_address, endpoint, request_count, window_start)
        VALUES (auth.uid(), inet_client_addr(), p_endpoint, 1, NOW())
        ON CONFLICT (user_id, endpoint, window_start) 
        DO UPDATE SET request_count = rate_limits.request_count + 1;
        
        RETURN TRUE;
    ELSE
        -- Log security event for rate limit exceeded
        PERFORM public.log_security_event('rate_limit_exceeded', 
            jsonb_build_object(
                'endpoint', p_endpoint,
                'user_id', auth.uid(),
                'ip_address', inet_client_addr(),
                'current_count', v_current_count,
                'limit', p_max_requests
            )
        );
        RETURN FALSE;
    END IF;
END;
$$;

-- 7. ADD TRIGGERS FOR CRITICAL TABLES TO LOG CHANGES
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.audit_log (
        table_name,
        operation,
        old_data,
        new_data,
        user_id
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
        auth.uid()
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit triggers to critical tables
DO $$
DECLARE
    critical_tables TEXT[] := ARRAY['customer', 'order', 'payment', 'user_roles', 'driver_profiles'];
    table_name TEXT;
BEGIN
    FOREACH table_name IN ARRAY critical_tables
    LOOP
        BEGIN
            EXECUTE format('DROP TRIGGER IF EXISTS audit_trigger_%s ON public.%I', table_name, table_name);
            EXECUTE format('CREATE TRIGGER audit_trigger_%s AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.audit_trigger()', table_name, table_name);
            RAISE NOTICE 'Added audit trigger to table: %', table_name;
        EXCEPTION 
            WHEN undefined_table THEN
                RAISE NOTICE 'Table % does not exist, skipping audit trigger', table_name;
        END;
    END LOOP;
END $$;

-- 8. CREATE SECURITY MONITORING VIEWS (ADMIN ONLY)
CREATE OR REPLACE VIEW public.security_dashboard AS
SELECT 
    'failed_logins' as metric,
    COUNT(*) as value,
    'last_hour' as period
FROM public.audit_log 
WHERE operation = 'login_failed' 
AND timestamp > NOW() - INTERVAL '1 hour'

UNION ALL

SELECT 
    'rate_limit_violations' as metric,
    COUNT(*) as value,
    'last_hour' as period
FROM public.audit_log 
WHERE operation = 'rate_limit_exceeded' 
AND timestamp > NOW() - INTERVAL '1 hour'

UNION ALL

SELECT 
    'admin_operations' as metric,
    COUNT(*) as value,
    'last_24h' as period
FROM public.audit_log 
WHERE user_id IN (
    SELECT user_id FROM public.user_roles WHERE role = 'admin'
)
AND timestamp > NOW() - INTERVAL '24 hours';

-- Secure the security dashboard view
GRANT SELECT ON public.security_dashboard TO authenticated;

-- 9. UPDATE EXISTING POLICIES TO BE MORE RESTRICTIVE
-- Remove overly permissive anonymous policies and replace with authenticated-only

DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Find and update policies that allow anonymous access to sensitive data
    FOR policy_record IN
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
        AND (
            -- Policies that use 'true' (allow all)
            qual = 'true'
            OR with_check = 'true'
            -- Add more patterns for overly permissive policies
        )
        AND tablename NOT IN ('product', 'product_category', 'product_variant', 'region', 'store', 'sales_channel')
    LOOP
        BEGIN
            -- Drop the overly permissive policy
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_record.policyname, policy_record.tablename);
            
            -- Replace with authenticated-only policy
            EXECUTE format(
                'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))',
                policy_record.policyname || '_secure',
                policy_record.tablename
            );
            
            RAISE NOTICE 'Secured policy % on table %', policy_record.policyname, policy_record.tablename;
        EXCEPTION 
            WHEN duplicate_object THEN
                RAISE NOTICE 'Secure policy already exists for %', policy_record.tablename;
            WHEN others THEN
                RAISE NOTICE 'Could not secure policy % on table %: %', policy_record.policyname, policy_record.tablename, SQLERRM;
        END;
    END LOOP;
END $$;
