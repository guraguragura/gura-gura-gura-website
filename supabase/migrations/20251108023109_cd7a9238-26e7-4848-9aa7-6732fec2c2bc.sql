-- Function to manually trigger the deal notification check (for testing)
CREATE OR REPLACE FUNCTION public.trigger_deal_notification_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  -- This function allows manual triggering of the deal notification check
  -- The actual HTTP call will be made from the frontend using supabase.functions.invoke
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Use supabase.functions.invoke to call check-deal-notifications',
    'triggered_at', now()
  );
END;
$$;

-- Function to get cron job status
CREATE OR REPLACE FUNCTION public.get_deal_notification_cron_status()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_job_info record;
BEGIN
  SELECT * INTO v_job_info
  FROM cron.job
  WHERE jobname = 'daily-deal-notification-check'
  LIMIT 1;
  
  IF v_job_info IS NULL THEN
    RETURN jsonb_build_object(
      'active', false,
      'message', 'Cron job not found'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'active', v_job_info.active,
    'schedule', v_job_info.schedule,
    'jobname', v_job_info.jobname,
    'last_run', (
      SELECT max(end_time)
      FROM cron.job_run_details
      WHERE jobid = v_job_info.jobid
    )
  );
END;
$$;