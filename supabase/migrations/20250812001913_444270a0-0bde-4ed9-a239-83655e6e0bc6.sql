-- Update get_customer_id_for_user to deterministically select the latest customer by email
CREATE OR REPLACE FUNCTION public.get_customer_id_for_user()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT c.id 
  FROM public.customer c 
  WHERE c.email = (
    SELECT email 
    FROM auth.users 
    WHERE id = auth.uid()
  )
  ORDER BY c.created_at DESC
  LIMIT 1
$function$;