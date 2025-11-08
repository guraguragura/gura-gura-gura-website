-- Create brevo_sync_log table for tracking sync operations
CREATE TABLE IF NOT EXISTS public.brevo_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_email TEXT NOT NULL,
  sync_type TEXT NOT NULL, -- 'subscribe', 'unsubscribe', 'deal_trigger', 'attribute_update'
  sync_status TEXT NOT NULL, -- 'success', 'failed', 'pending'
  contact_attributes JSONB,
  brevo_response JSONB,
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX idx_brevo_sync_log_email ON public.brevo_sync_log(contact_email);
CREATE INDEX idx_brevo_sync_log_status ON public.brevo_sync_log(sync_status);
CREATE INDEX idx_brevo_sync_log_type ON public.brevo_sync_log(sync_type);
CREATE INDEX idx_brevo_sync_log_created_at ON public.brevo_sync_log(created_at DESC);

-- Enable RLS
ALTER TABLE public.brevo_sync_log ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (edge functions)
CREATE POLICY "Service role can manage brevo sync logs"
  ON public.brevo_sync_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to view their own sync logs
CREATE POLICY "Users can view their own sync logs"
  ON public.brevo_sync_log
  FOR SELECT
  TO authenticated
  USING (contact_email = current_user_email());