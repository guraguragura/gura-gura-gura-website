-- PHASE 2: COMPLETE RLS ROLLOUT FOR ALL REMAINING TABLES
-- This will enable RLS on all remaining unprotected tables and add comprehensive security policies

-- 1. ENABLE RLS ON ALL REMAINING TABLES
-- Core e-commerce tables
ALTER TABLE public.product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_category_product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collection_product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_value ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tag_product ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variant ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.region ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_channel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_option ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_option_rule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_location ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_rate ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_region ENABLE ROW LEVEL SECURITY;

-- Order and fulfillment tables
ALTER TABLE public.order ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_line_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_line_item_adjustment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_line_item_tax_line ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_shipping_method ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_shipping_method_adjustment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_shipping_method_tax_line ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return_reason ENABLE ROW LEVEL SECURITY;

-- Payment tables
ALTER TABLE public.payment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_collection ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_method_token ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_provider ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refund ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refund_reason ENABLE ROW LEVEL SECURITY;

-- Promotion and discount tables
ALTER TABLE public.promotion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_application_method ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_campaign ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_campaign_budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_rule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_rule_value ENABLE ROW LEVEL SECURITY;

-- Inventory tables
ALTER TABLE public.inventory_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_level ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservation_item ENABLE ROW LEVEL SECURITY;

-- User and role tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite ENABLE ROW LEVEL SECURITY;

-- Workflow and notification tables
ALTER TABLE public.workflow_execution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_provider ENABLE ROW LEVEL SECURITY;

-- File and upload tables
ALTER TABLE public.file ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upload ENABLE ROW LEVEL SECURITY;

-- 2. ADD PUBLIC READ POLICIES FOR PRODUCT CATALOG DATA
-- These tables should be readable by everyone for browsing products
CREATE POLICY "Public can read products" ON public.product
  FOR SELECT USING (true);

CREATE POLICY "Public can read product categories" ON public.product_category
  FOR SELECT USING (true);

CREATE POLICY "Public can read product category relationships" ON public.product_category_product
  FOR SELECT USING (true);

CREATE POLICY "Public can read product collections" ON public.product_collection
  FOR SELECT USING (true);

CREATE POLICY "Public can read product collection relationships" ON public.product_collection_product
  FOR SELECT USING (true);

CREATE POLICY "Public can read product images" ON public.product_image
  FOR SELECT USING (true);

CREATE POLICY "Public can read product options" ON public.product_option
  FOR SELECT USING (true);

CREATE POLICY "Public can read product option values" ON public.product_option_value
  FOR SELECT USING (true);

CREATE POLICY "Public can read product tags" ON public.product_tag
  FOR SELECT USING (true);

CREATE POLICY "Public can read product tag relationships" ON public.product_tag_product
  FOR SELECT USING (true);

CREATE POLICY "Public can read product types" ON public.product_type
  FOR SELECT USING (true);

CREATE POLICY "Public can read product variants" ON public.product_variant
  FOR SELECT USING (true);

CREATE POLICY "Public can read regions" ON public.region
  FOR SELECT USING (true);

CREATE POLICY "Public can read sales channels" ON public.sales_channel
  FOR SELECT USING (true);

CREATE POLICY "Public can read shipping options" ON public.shipping_option
  FOR SELECT USING (true);

CREATE POLICY "Public can read shipping option rules" ON public.shipping_option_rule
  FOR SELECT USING (true);

CREATE POLICY "Public can read stores" ON public.store
  FOR SELECT USING (true);

-- 3. ADD ADMIN-ONLY POLICIES FOR SENSITIVE BUSINESS DATA
CREATE POLICY "Admins only access" ON public.promotion
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.promotion_application_method
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.promotion_campaign
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.promotion_campaign_budget
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.promotion_rule
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.promotion_rule_value
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.payment
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.payment_collection
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.payment_session
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.refund
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.inventory_item
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.inventory_level
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only access" ON public.stock_location
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. ADD CUSTOMER-SPECIFIC POLICIES FOR ORDERS AND PERSONAL DATA
CREATE POLICY "Customers can view their own orders" ON public.order
  FOR SELECT USING (
    customer_id = (
      SELECT c.id FROM customer c 
      WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all orders" ON public.order
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Drivers can view assigned orders" ON public.order
  FOR SELECT USING (driver_id = auth.uid());

CREATE POLICY "Drivers can update assigned orders" ON public.order
  FOR UPDATE USING (driver_id = auth.uid());

CREATE POLICY "Customers can view their order line items" ON public.order_line_item
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.order o 
      WHERE o.id = order_line_item.order_id 
      AND o.customer_id = (
        SELECT c.id FROM customer c 
        WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

CREATE POLICY "Admins can manage all order line items" ON public.order_line_item
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 5. ADD USER ROLE MANAGEMENT POLICIES
CREATE POLICY "Admins can manage all user roles" ON public.user_roles
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

-- 6. FIX REMAINING DATABASE FUNCTIONS WITH SEARCH_PATH ISSUES
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

-- Continue fixing remaining functions...
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

-- Fix all remaining functions with SET search_path = public
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
  FROM "order" 
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
  UPDATE "order" 
  SET 
    driver_id = p_driver_id,
    unified_status = 'assigned_to_driver',
    driver_accepted_at = NOW(),
    updated_at = NOW()
  WHERE id = p_order_id;
  
  -- Insert status history record
  INSERT INTO order_status_history (
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

-- Continue with remaining function fixes...
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
  FROM product p
  JOIN product_category_product pcp1 ON p.id = pcp1.product_id
  JOIN product_category_product pcp2 ON pcp1.product_category_id = pcp2.product_category_id
  WHERE pcp2.product_id = current_product_id
    AND p.id != current_product_id
    AND p.status = 'published'
  LIMIT 4;
END;
$function$;

-- 7. ADD ADDITIONAL SECURITY POLICIES FOR REMAINING TABLES
CREATE POLICY "Authenticated users can view return reasons" ON public.return_reason
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Customers can create returns for their orders" ON public.return
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.order o
      WHERE o.id = return.order_id 
      AND o.customer_id = (
        SELECT c.id FROM customer c 
        WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

CREATE POLICY "Customers can view their own returns" ON public.return
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.order o
      WHERE o.id = return.order_id 
      AND o.customer_id = (
        SELECT c.id FROM customer c 
        WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  );

CREATE POLICY "Admins can manage all returns" ON public.return
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));