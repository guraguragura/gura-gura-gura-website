
-- 1) Helper function to safely get the current user's email (no direct RLS access to auth.users)
create or replace function public.current_user_email()
returns text
language sql
security definer
set search_path to 'public'
as $$
  select u.email
  from auth.users u
  where u.id = auth.uid()
$$;

-- Ensure the function can be called by anon/authenticated roles
revoke all on function public.current_user_email() from public;
grant execute on function public.current_user_email() to anon, authenticated;

-- 2) Update RLS policies on public.customer
-- Drop existing policies that reference auth.users directly
drop policy if exists "customer_authenticated_select" on public.customer;
drop policy if exists "customer_own_select" on public.customer;
drop policy if exists "customer_own_update" on public.customer;

-- Create clear per-command policies using current_user_email()
create policy "customer_select_own"
  on public.customer
  for select
  using (email = public.current_user_email());

create policy "customer_insert_own"
  on public.customer
  for insert
  with check (email = public.current_user_email());

create policy "customer_update_own"
  on public.customer
  for update
  using (email = public.current_user_email());

-- 3) Update RLS policies on public.customer_address
-- Replace policies that reference auth.users with ones using get_customer_id_for_user()
drop policy if exists "Customers can manage their own addresses" on public.customer_address;
drop policy if exists "customer_address_own" on public.customer_address;

create policy "customer_address_manage_own"
  on public.customer_address
  for all
  using (customer_id = public.get_customer_id_for_user())
  with check (customer_id = public.get_customer_id_for_user());
