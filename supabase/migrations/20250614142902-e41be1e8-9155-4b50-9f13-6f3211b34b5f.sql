
-- Create new unified order status enum with all payment and delivery states
CREATE TYPE unified_order_status_enum AS ENUM (
  'pending_payment',
  'paid', 
  'processing',
  'ready_for_pickup',
  'assigned_to_driver',
  'picked_up',
  'out_for_delivery',
  'delivered',
  'failed_delivery',
  'cancelled',
  'refunded'
);

-- Add new unified status column to order table
ALTER TABLE public.order ADD COLUMN unified_status unified_order_status_enum DEFAULT 'pending_payment';

-- Add timestamp columns for better tracking
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS processing_started_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS ready_for_pickup_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS failed_delivery_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;
ALTER TABLE public.order ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ;

-- Migrate existing data to unified status with proper casting
-- Map current status + delivery_status combinations to unified status
UPDATE public.order SET unified_status = 
  CASE 
    WHEN status = 'pending' AND delivery_status = 'pending' THEN 'pending_payment'::unified_order_status_enum
    WHEN status = 'completed' AND delivery_status = 'pending' THEN 'paid'::unified_order_status_enum
    WHEN delivery_status = 'confirmed' THEN 'processing'::unified_order_status_enum
    WHEN delivery_status = 'ready_for_pickup' THEN 'ready_for_pickup'::unified_order_status_enum
    WHEN delivery_status = 'assigned_to_driver' THEN 'assigned_to_driver'::unified_order_status_enum
    WHEN delivery_status = 'picked_up' THEN 'picked_up'::unified_order_status_enum
    WHEN delivery_status = 'out_for_delivery' THEN 'out_for_delivery'::unified_order_status_enum
    WHEN delivery_status = 'delivered' THEN 'delivered'::unified_order_status_enum
    WHEN delivery_status = 'cancelled' THEN 'cancelled'::unified_order_status_enum
    WHEN status = 'canceled' THEN 'cancelled'::unified_order_status_enum
    ELSE 'pending_payment'::unified_order_status_enum
  END;

-- Create function to validate status transitions
CREATE OR REPLACE FUNCTION validate_order_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Define allowed transitions
  IF OLD.unified_status IS NOT NULL AND NEW.unified_status != OLD.unified_status THEN
    -- Check if transition is valid
    IF NOT (
      (OLD.unified_status = 'pending_payment' AND NEW.unified_status IN ('paid', 'cancelled')) OR
      (OLD.unified_status = 'paid' AND NEW.unified_status IN ('processing', 'cancelled', 'refunded')) OR
      (OLD.unified_status = 'processing' AND NEW.unified_status IN ('ready_for_pickup', 'cancelled')) OR
      (OLD.unified_status = 'ready_for_pickup' AND NEW.unified_status IN ('assigned_to_driver', 'cancelled')) OR
      (OLD.unified_status = 'assigned_to_driver' AND NEW.unified_status IN ('picked_up', 'cancelled')) OR
      (OLD.unified_status = 'picked_up' AND NEW.unified_status IN ('out_for_delivery', 'failed_delivery', 'cancelled')) OR
      (OLD.unified_status = 'out_for_delivery' AND NEW.unified_status IN ('delivered', 'failed_delivery', 'cancelled')) OR
      (OLD.unified_status = 'failed_delivery' AND NEW.unified_status IN ('assigned_to_driver', 'cancelled', 'refunded')) OR
      (OLD.unified_status = 'delivered' AND NEW.unified_status = 'refunded') OR
      (OLD.unified_status = 'cancelled' AND NEW.unified_status = 'refunded')
    ) THEN
      RAISE EXCEPTION 'Invalid status transition from % to %', OLD.unified_status, NEW.unified_status;
    END IF;
  END IF;
  
  -- Auto-set timestamps based on status
  IF NEW.unified_status != OLD.unified_status THEN
    CASE NEW.unified_status
      WHEN 'paid' THEN NEW.paid_at = COALESCE(NEW.paid_at, NOW());
      WHEN 'processing' THEN NEW.processing_started_at = COALESCE(NEW.processing_started_at, NOW());
      WHEN 'ready_for_pickup' THEN NEW.ready_for_pickup_at = COALESCE(NEW.ready_for_pickup_at, NOW());
      WHEN 'assigned_to_driver' THEN NEW.assigned_at = COALESCE(NEW.assigned_at, NOW());
      WHEN 'picked_up' THEN NEW.picked_up_at = COALESCE(NEW.picked_up_at, NOW());
      WHEN 'delivered' THEN NEW.delivered_at = COALESCE(NEW.delivered_at, NOW());
      WHEN 'failed_delivery' THEN NEW.failed_delivery_at = COALESCE(NEW.failed_delivery_at, NOW());
      WHEN 'cancelled' THEN NEW.cancelled_at = COALESCE(NEW.cancelled_at, NOW());
      WHEN 'refunded' THEN NEW.refunded_at = COALESCE(NEW.refunded_at, NOW());
      ELSE NULL;
    END CASE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status validation and timestamp automation
CREATE TRIGGER order_status_transition_trigger
  BEFORE UPDATE ON public.order
  FOR EACH ROW
  EXECUTE FUNCTION validate_order_status_transition();

-- Create indexes for better performance
CREATE INDEX idx_orders_unified_status ON public.order(unified_status);
CREATE INDEX idx_orders_unified_status_driver ON public.order(unified_status, driver_id) WHERE driver_id IS NOT NULL;

-- Update RLS policies to work with unified status
DROP POLICY IF EXISTS "Drivers can view unassigned orders or their own orders" ON public.order;
CREATE POLICY "Drivers can view orders available for pickup or their assigned orders" 
  ON public.order 
  FOR SELECT 
  TO authenticated
  USING (
    unified_status = 'ready_for_pickup' AND driver_id IS NULL
    OR 
    driver_id IN (SELECT id FROM public.driver_profiles WHERE user_id = auth.uid())
  );
