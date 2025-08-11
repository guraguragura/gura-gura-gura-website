-- 1) Create rate_limits table (if missing) and secure it
create table if not exists public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  ip_address inet null,
  endpoint text not null,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Helpful indexes for lookups and aggregation
create index if not exists idx_rate_limits_lookup on public.rate_limits (user_id, endpoint, window_start);
create index if not exists idx_rate_limits_ip_endpoint on public.rate_limits (ip_address, endpoint, window_start);

-- Unique index to support ON CONFLICT (user_id, endpoint, window_start)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uniq_rate_limits_user_endpoint_window'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX uniq_rate_limits_user_endpoint_window ON public.rate_limits(user_id, endpoint, window_start)';
  END IF;
END$$;

-- Enable RLS and restrict to admins
alter table public.rate_limits enable row level security;
DROP POLICY IF EXISTS "rate_limits_admin_only" ON public.rate_limits;
CREATE POLICY "rate_limits_admin_only"
ON public.rate_limits
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));


-- 2) Create newsletter_subscriptions table and secure it
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'website',
  brevo_contact_id text,
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unique index on lower(email) to avoid duplicates by case
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uniq_newsletter_email_lower'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX uniq_newsletter_email_lower ON public.newsletter_subscriptions (lower(email))';
  END IF;
END$$;

-- Keep updated_at current
DROP TRIGGER IF EXISTS update_newsletter_subscriptions_updated_at ON public.newsletter_subscriptions;
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW EXECUTE FUNCTION public.update_newsletter_updated_at_column();

-- Enable RLS and allow only admins to read/write directly (Edge Function uses service role)
alter table public.newsletter_subscriptions enable row level security;
DROP POLICY IF EXISTS "newsletter_admin_manage" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "newsletter_public_insert" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "newsletter_public_select" ON public.newsletter_subscriptions;

CREATE POLICY "newsletter_admin_manage"
ON public.newsletter_subscriptions
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));
