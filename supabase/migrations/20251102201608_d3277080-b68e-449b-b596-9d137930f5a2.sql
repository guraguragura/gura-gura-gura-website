-- Add missing run_id column to workflow_execution table
-- This column is required by Medusa 2.6.1 but missing from the current schema

ALTER TABLE public.workflow_execution 
ADD COLUMN IF NOT EXISTS run_id varchar;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_workflow_execution_run_id 
ON public.workflow_execution(run_id);

-- Add comment for documentation
COMMENT ON COLUMN public.workflow_execution.run_id IS 'Workflow run identifier for tracking execution instances';