-- PHASE 2: COMPLETE RLS ROLLOUT FOR EXISTING TABLES ONLY
-- This will enable RLS on remaining tables that actually exist in the database

-- Query existing tables first to avoid errors
DO $$
BEGIN
    -- Only enable RLS on tables that exist
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product') THEN
        ALTER TABLE public.product ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_category') THEN
        ALTER TABLE public.product_category ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_category_product') THEN
        ALTER TABLE public.product_category_product ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_image') THEN
        ALTER TABLE public.product_image ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_option') THEN
        ALTER TABLE public.product_option ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_option_value') THEN
        ALTER TABLE public.product_option_value ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_tag') THEN
        ALTER TABLE public.product_tag ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_tag_product') THEN
        ALTER TABLE public.product_tag_product ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_type') THEN
        ALTER TABLE public.product_type ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_variant') THEN
        ALTER TABLE public.product_variant ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'region') THEN
        ALTER TABLE public.region ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'sales_channel') THEN
        ALTER TABLE public.sales_channel ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shipping_option') THEN
        ALTER TABLE public.shipping_option ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shipping_option_rule') THEN
        ALTER TABLE public.shipping_option_rule ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shipping_profile') THEN
        ALTER TABLE public.shipping_profile ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stock_location') THEN
        ALTER TABLE public.stock_location ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'store') THEN
        ALTER TABLE public.store ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tax_rate') THEN
        ALTER TABLE public.tax_rate ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tax_region') THEN
        ALTER TABLE public.tax_region ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Order tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order') THEN
        ALTER TABLE public.order ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_line_item') THEN
        ALTER TABLE public.order_line_item ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_line_item_adjustment') THEN
        ALTER TABLE public.order_line_item_adjustment ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_line_item_tax_line') THEN
        ALTER TABLE public.order_line_item_tax_line ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_shipping_method') THEN
        ALTER TABLE public.order_shipping_method ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_shipping_method_adjustment') THEN
        ALTER TABLE public.order_shipping_method_adjustment ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_shipping_method_tax_line') THEN
        ALTER TABLE public.order_shipping_method_tax_line ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_status_history') THEN
        ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Payment tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment') THEN
        ALTER TABLE public.payment ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_collection') THEN
        ALTER TABLE public.payment_collection ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_method_token') THEN
        ALTER TABLE public.payment_method_token ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_provider') THEN
        ALTER TABLE public.payment_provider ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_session') THEN
        ALTER TABLE public.payment_session ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'refund') THEN
        ALTER TABLE public.refund ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'refund_reason') THEN
        ALTER TABLE public.refund_reason ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Promotion tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion') THEN
        ALTER TABLE public.promotion ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_application_method') THEN
        ALTER TABLE public.promotion_application_method ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_campaign') THEN
        ALTER TABLE public.promotion_campaign ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_campaign_budget') THEN
        ALTER TABLE public.promotion_campaign_budget ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_rule') THEN
        ALTER TABLE public.promotion_rule ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_rule_value') THEN
        ALTER TABLE public.promotion_rule_value ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Inventory tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inventory_item') THEN
        ALTER TABLE public.inventory_item ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inventory_level') THEN
        ALTER TABLE public.inventory_level ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'reservation_item') THEN
        ALTER TABLE public.reservation_item ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- User and role tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
        ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'invite') THEN
        ALTER TABLE public.invite ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Other tables
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'workflow_execution') THEN
        ALTER TABLE public.workflow_execution ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notification') THEN
        ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notification_provider') THEN
        ALTER TABLE public.notification_provider ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'file') THEN
        ALTER TABLE public.file ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'upload') THEN
        ALTER TABLE public.upload ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'return') THEN
        ALTER TABLE public.return ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'return_item') THEN
        ALTER TABLE public.return_item ENABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'return_reason') THEN
        ALTER TABLE public.return_reason ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Now add policies for tables that exist
-- Public read policies for product catalog data (only if tables exist)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product') THEN
        EXECUTE 'CREATE POLICY "Public can read products" ON public.product FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_category') THEN
        EXECUTE 'CREATE POLICY "Public can read product categories" ON public.product_category FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_category_product') THEN
        EXECUTE 'CREATE POLICY "Public can read product category relationships" ON public.product_category_product FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'product_variant') THEN
        EXECUTE 'CREATE POLICY "Public can read product variants" ON public.product_variant FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'region') THEN
        EXECUTE 'CREATE POLICY "Public can read regions" ON public.region FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'sales_channel') THEN
        EXECUTE 'CREATE POLICY "Public can read sales channels" ON public.sales_channel FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'shipping_option') THEN
        EXECUTE 'CREATE POLICY "Public can read shipping options" ON public.shipping_option FOR SELECT USING (true)';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'store') THEN
        EXECUTE 'CREATE POLICY "Public can read stores" ON public.store FOR SELECT USING (true)';
    END IF;
EXCEPTION 
    WHEN duplicate_object THEN
        -- Policy already exists, skip
        NULL;
END $$;

-- Add admin-only policies for sensitive data
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.payment FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_collection') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.payment_collection FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'refund') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.refund FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.promotion FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inventory_item') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.inventory_item FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inventory_level') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.inventory_level FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stock_location') THEN
        EXECUTE 'CREATE POLICY "Admins only access" ON public.stock_location FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
EXCEPTION 
    WHEN duplicate_object THEN
        -- Policy already exists, skip
        NULL;
END $$;

-- Add customer-specific policies for orders
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order') THEN
        EXECUTE 'CREATE POLICY "Customers can view their own orders" ON public.order FOR SELECT USING (customer_id = (SELECT c.id FROM customer c WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid())))';
        EXECUTE 'CREATE POLICY "Admins can manage all orders" ON public.order FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
        EXECUTE 'CREATE POLICY "Drivers can view assigned orders" ON public.order FOR SELECT USING (driver_id = auth.uid())';
        EXECUTE 'CREATE POLICY "Drivers can update assigned orders" ON public.order FOR UPDATE USING (driver_id = auth.uid())';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_line_item') THEN
        EXECUTE 'CREATE POLICY "Customers can view their order line items" ON public.order_line_item FOR SELECT USING (EXISTS (SELECT 1 FROM public.order o WHERE o.id = order_line_item.order_id AND o.customer_id = (SELECT c.id FROM customer c WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid()))))';
        EXECUTE 'CREATE POLICY "Admins can manage all order line items" ON public.order_line_item FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
    END IF;
EXCEPTION 
    WHEN duplicate_object THEN
        -- Policy already exists, skip
        NULL;
END $$;

-- Add user role management policies
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
        EXECUTE 'CREATE POLICY "Admins can manage all user roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (has_role(auth.uid(), ''admin''::app_role))';
        EXECUTE 'CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid())';
    END IF;
EXCEPTION 
    WHEN duplicate_object THEN
        -- Policy already exists, skip
        NULL;
END $$;