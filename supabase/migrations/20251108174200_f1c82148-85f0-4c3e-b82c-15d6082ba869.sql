-- Fix RLS policies to allow authenticated users to manage their own customer profile and addresses

-- 1) Drop existing policies on customer and customer_address to remove faulty references (e.g., to public.users)
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customer' LOOP
    EXECUTE format('drop policy if exists %I on public.customer', r.policyname);
  END LOOP;
  
  FOR r IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'customer_address' LOOP
    EXECUTE format('drop policy if exists %I on public.customer_address', r.policyname);
  END LOOP;
END $$;

-- 2) Ensure RLS is enabled
alter table public.customer enable row level security;
alter table public.customer_address enable row level security;

-- 3) Create least-privilege policies for customer
-- Allow users to see their own customer row either by user_id or by email in JWT (to support first-time linking)
create policy "customer_select_own"
  on public.customer
  for select
  using (
    user_id = auth.uid() OR email = (auth.jwt() ->> 'email')
  );

-- Only allow inserts when the row is for the authenticated user (user_id must match and email aligns with JWT)
create policy "customer_insert_own"
  on public.customer
  for insert
  with check (
    user_id = auth.uid() AND email = (auth.jwt() ->> 'email')
  );

-- Only allow updates to own customer row
create policy "customer_update_own"
  on public.customer
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- 4) Policies for customer_address linked through customer ownership
-- View only addresses that belong to your customer row
create policy "customer_address_select_own"
  on public.customer_address
  for select
  using (
    exists (
      select 1 from public.customer c
      where c.id = customer_address.customer_id
        and c.user_id = auth.uid()
    )
  );

-- Allow insert only if the address belongs to your customer row
create policy "customer_address_insert_own"
  on public.customer_address
  for insert
  with check (
    exists (
      select 1 from public.customer c
      where c.id = customer_address.customer_id
        and c.user_id = auth.uid()
    )
  );

-- Allow updates only to your own addresses
create policy "customer_address_update_own"
  on public.customer_address
  for update
  using (
    exists (
      select 1 from public.customer c
      where c.id = customer_address.customer_id
        and c.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.customer c
      where c.id = customer_address.customer_id
        and c.user_id = auth.uid()
    )
  );

-- (Optional) Allow deleting own addresses
create policy "customer_address_delete_own"
  on public.customer_address
  for delete
  using (
    exists (
      select 1 from public.customer c
      where c.id = customer_address.customer_id
        and c.user_id = auth.uid()
    )
  );
