
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UnifiedOrderStatus } from '@/utils/unifiedOrderStatusUtils';
import { useAuth } from '@/contexts/AuthContext';

interface CustomerOrder {
  id: string;
  display_id: number;
  status: string;
  unified_status: UnifiedOrderStatus;
  customer_id: string;
  email: string;
  currency_code: string;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  processing_started_at: string | null;
  ready_for_pickup_at: string | null;
  assigned_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  driver_id: string | null;
  metadata: any;
}

export const useCustomerOrders = () => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
      
      // Subscribe to real-time updates for this customer's orders
      const channel = supabase
        .channel('customer-orders')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'order',
            filter: `email=eq.${user.email}`
          },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('order')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    refreshOrders: fetchOrders
  };
};
