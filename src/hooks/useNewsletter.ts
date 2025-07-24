import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseNewsletterOptions {
  source?: string;
}

export const useNewsletter = ({ source = 'website' }: UseNewsletterOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscription', {
        body: { email: email.toLowerCase().trim(), source }
      });

      if (error) {
        throw error;
      }

      const result = data;

      toast({
        title: result.alreadySubscribed ? 'Already subscribed!' : 'Welcome to Gura! 🎉',
        description: result.message,
      });

      return true;
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      
      toast({
        title: 'Subscription failed',
        description: error.message || 'Unable to subscribe right now. Please try again.',
        variant: 'destructive',
      });

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    subscribe,
    isSubmitting,
  };
};