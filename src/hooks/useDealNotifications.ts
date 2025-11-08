import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface DealSubscription {
  id: string;
  product_id: string;
  email: string;
  notified: boolean;
  created_at: string;
}

export const useDealNotifications = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const subscribeToDeal = async (productId: string, email?: string) => {
    if (!user && !email) {
      toast({
        title: "Email required",
        description: "Please provide your email to subscribe to deal notifications",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const userEmail = user?.email || email;
      
      const { error } = await supabase
        .from('product_deal_subscriptions')
        .insert({
          user_id: user?.id || '00000000-0000-0000-0000-000000000000', // Placeholder for guests
          product_id: productId,
          email: userEmail!,
          notified: false,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "You're already subscribed to notifications for this product",
          });
          return true;
        }
        throw error;
      }

      toast({
        title: "Subscribed!",
        description: "You'll be notified when this product goes on sale",
      });
      
      return true;
    } catch (error) {
      console.error('Error subscribing to deal:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe to deal notifications",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromDeal = async (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to manage your subscriptions",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('product_deal_subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      toast({
        title: "Unsubscribed",
        description: "You won't receive notifications for this product anymore",
      });
      
      return true;
    } catch (error) {
      console.error('Error unsubscribing from deal:', error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe from deal notifications",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkSubscription = async (productId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('product_deal_subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  const getUserSubscriptions = async (): Promise<DealSubscription[]> => {
    if (!user) return [];

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_deal_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribeToDeal,
    unsubscribeFromDeal,
    checkSubscription,
    getUserSubscriptions,
    loading,
  };
};
