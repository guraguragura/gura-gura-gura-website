-- Fix function search path for security
ALTER FUNCTION public.update_newsletter_updated_at_column() SET search_path = 'public';

-- Also update existing functions to be more secure
ALTER FUNCTION public.handle_new_user() SET search_path = 'public';
ALTER FUNCTION public.populate_order_metadata(p_order_id text, p_customer_id text, p_cart_id text) SET search_path = 'public';
ALTER FUNCTION public.geocode_kigali_address(p_address text, p_city text, p_district text) SET search_path = 'public';
ALTER FUNCTION public.get_products_by_category(cid uuid) SET search_path = 'public';
ALTER FUNCTION public.calculate_driver_statistics(p_driver_id uuid) SET search_path = 'public';
ALTER FUNCTION public.handle_new_driver() SET search_path = 'public';
ALTER FUNCTION public.update_driver_stats_on_delivery() SET search_path = 'public';
ALTER FUNCTION public.validate_order_status_transition() SET search_path = 'public';
ALTER FUNCTION public.map_unified_status_to_customer_status(unified_status_val unified_order_status_enum) SET search_path = 'public';
ALTER FUNCTION public.update_driver_rating(p_driver_id uuid) SET search_path = 'public';
ALTER FUNCTION public.calculate_driver_period_earnings(p_driver_id uuid, p_period text) SET search_path = 'public';
ALTER FUNCTION public.accept_driver_order(p_order_id text, p_driver_id uuid) SET search_path = 'public';
ALTER FUNCTION public.get_related_products(current_product_id uuid) SET search_path = 'public';
ALTER FUNCTION public.handle_rating_update() SET search_path = 'public';
ALTER FUNCTION public.refuse_driver_order(p_order_id text, p_driver_id uuid, p_reason text) SET search_path = 'public';
ALTER FUNCTION public.verify_delivery_proof(p_order_id text, p_proof_code text) SET search_path = 'public';
ALTER FUNCTION public.auto_generate_delivery_proof() SET search_path = 'public';
ALTER FUNCTION public.validate_order_for_pickup() SET search_path = 'public';
ALTER FUNCTION public.audit_changes() SET search_path = 'public';
ALTER FUNCTION public.generate_delivery_proof_code() SET search_path = 'public';
ALTER FUNCTION public.validate_input_length(input_text text, max_length integer) SET search_path = 'public';
ALTER FUNCTION public.validate_email_format(email_text text) SET search_path = 'public';
ALTER FUNCTION public.log_security_event(event_type text, details jsonb) SET search_path = 'public';
ALTER FUNCTION public.check_rate_limit(p_endpoint text, p_max_requests integer, p_window_minutes integer) SET search_path = 'public';
ALTER FUNCTION public.audit_trigger() SET search_path = 'public';