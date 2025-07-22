-- PHASE 1: CRITICAL SECURITY FIXES - Part 1
-- Fix Security Definer View issues and update RLS policies to restrict anonymous access

-- 1. First, let's identify and fix any problematic views with SECURITY DEFINER
-- Drop any existing problematic views and recreate them properly
DROP VIEW IF EXISTS public.security_dashboard;

-- 2. Update RLS policies to restrict anonymous access where appropriate
-- Keep anonymous access only for public catalog data (products, categories, etc.)

-- Fix customer table - ensure only authenticated users can access customer data
DROP POLICY IF EXISTS "customer_public_read" ON public.customer;

-- Recreate customer policies to be more restrictive
CREATE POLICY "customer_authenticated_select" ON public.customer
FOR SELECT TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Fix cart policies - ensure only authenticated users can access cart data
DROP POLICY IF EXISTS "public_cart_access" ON public.cart;
DROP POLICY IF EXISTS "Customers can manage their own carts" ON public.cart;
DROP POLICY IF EXISTS "Users can manage their own carts" ON public.cart;

CREATE POLICY "cart_authenticated_access" ON public.cart
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

-- Fix order table policies - restrict anonymous access
DROP POLICY IF EXISTS "public_order_access" ON public.order;
DROP POLICY IF EXISTS "order_customer_select" ON public.order;
DROP POLICY IF EXISTS "order_driver_access" ON public.order;
DROP POLICY IF EXISTS "order_admin_access" ON public.order;

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

-- Fix cart_address policies
DROP POLICY IF EXISTS "Users can manage their own cart addresses" ON public.cart_address;

CREATE POLICY "cart_address_authenticated_access" ON public.cart_address
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

-- Fix cart_line_item policies
DROP POLICY IF EXISTS "Users can manage cart items for their own carts" ON public.cart_line_item;

CREATE POLICY "cart_line_item_authenticated_access" ON public.cart_line_item
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = cart_line_item.cart_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = cart_line_item.cart_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);

-- Fix cart adjustment policies to be more restrictive
DROP POLICY IF EXISTS "Users can view adjustments for their cart items" ON public.cart_line_item_adjustment;

CREATE POLICY "cart_adjustment_authenticated_view" ON public.cart_line_item_adjustment
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart_line_item cli
    JOIN cart c ON c.id = cli.cart_id
    WHERE cli.id = cart_line_item_adjustment.item_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);

-- Fix tax line policies
DROP POLICY IF EXISTS "Users can view tax lines for their cart items" ON public.cart_line_item_tax_line;

CREATE POLICY "cart_tax_authenticated_view" ON public.cart_line_item_tax_line
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart_line_item cli
    JOIN cart c ON c.id = cli.cart_id
    WHERE cli.id = cart_line_item_tax_line.item_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);

-- Fix payment collection policies
DROP POLICY IF EXISTS "Users can view payment collections for their carts" ON public.cart_payment_collection;

CREATE POLICY "cart_payment_authenticated_view" ON public.cart_payment_collection
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = (cart_payment_collection.cart_id)::text 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);

-- Fix promotion policies
DROP POLICY IF EXISTS "Users can view promotions for their carts" ON public.cart_promotion;

CREATE POLICY "cart_promotion_authenticated_view" ON public.cart_promotion
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = (cart_promotion.cart_id)::text 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);

-- Fix shipping method policies
DROP POLICY IF EXISTS "Users can manage shipping methods for their carts" ON public.cart_shipping_method;

CREATE POLICY "cart_shipping_authenticated_access" ON public.cart_shipping_method
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = cart_shipping_method.cart_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM cart c
    WHERE c.id = cart_shipping_method.cart_id 
    AND c.customer_id = (
      SELECT cu.id FROM customer cu
      WHERE cu.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
);