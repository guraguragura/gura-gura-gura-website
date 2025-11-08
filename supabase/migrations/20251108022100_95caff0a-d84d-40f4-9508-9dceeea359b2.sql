-- Create table for product deal notifications
CREATE TABLE IF NOT EXISTS public.product_deal_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.product(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  notified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.product_deal_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own subscriptions"
ON public.product_deal_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions"
ON public.product_deal_subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions"
ON public.product_deal_subscriptions
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_product_deal_subscriptions_user_id ON public.product_deal_subscriptions(user_id);
CREATE INDEX idx_product_deal_subscriptions_product_id ON public.product_deal_subscriptions(product_id);
CREATE INDEX idx_product_deal_subscriptions_notified ON public.product_deal_subscriptions(notified);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_product_deal_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_product_deal_subscriptions_updated_at
BEFORE UPDATE ON public.product_deal_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_product_deal_subscriptions_updated_at();