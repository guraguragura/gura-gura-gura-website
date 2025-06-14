
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UnifiedOrderStatus } from '@/utils/unifiedOrderStatusUtils';
import { useAuth } from '@/contexts/AuthContext';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  thumbnail?: string;
}

export interface CustomerOrderDetails {
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
  cancelled_at: string | null;
  driver_id: string | null;
  metadata: any;
  items: OrderItem[];
  shipping: {
    address: string;
    method: string;
    cost: number;
  };
  payment: {
    method: string;
    last4?: string;
  };
  total: number;
  date: string;
}

export const useCustomerOrders = () => {
  const [orders, setOrders] = useState<CustomerOrderDetails[]>([]);
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

      // Fetch orders with addresses
      const { data: ordersData, error: ordersError } = await supabase
        .from('order')
        .select(`
          *,
          shipping_address:order_address!order_shipping_address_id_fkey(*),
          billing_address:order_address!order_billing_address_id_fkey(*)
        `)
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Transform the data to match our interface
      const transformedOrders: CustomerOrderDetails[] = (ordersData || []).map(order => {
        const shippingAddress = order.shipping_address;
        const addressParts = [];
        
        if (shippingAddress?.address_1) addressParts.push(shippingAddress.address_1);
        if (shippingAddress?.address_2) addressParts.push(shippingAddress.address_2);
        if (shippingAddress?.city) addressParts.push(shippingAddress.city);
        if (shippingAddress?.province) addressParts.push(shippingAddress.province);
        if (shippingAddress?.postal_code) addressParts.push(shippingAddress.postal_code);

        return {
          id: order.id,
          display_id: order.display_id,
          status: order.status,
          unified_status: order.unified_status || 'pending_payment',
          customer_id: order.customer_id,
          email: order.email,
          currency_code: order.currency_code,
          created_at: order.created_at,
          updated_at: order.updated_at,
          paid_at: order.paid_at,
          processing_started_at: order.processing_started_at,
          ready_for_pickup_at: order.ready_for_pickup_at,
          assigned_at: order.assigned_at,
          picked_up_at: order.picked_up_at,
          delivered_at: order.delivered_at,
          cancelled_at: order.cancelled_at,
          driver_id: order.driver_id,
          metadata: order.metadata,
          items: [], // We'll populate this with mock data for now
          shipping: {
            address: addressParts.join(', ') || 'Address not available',
            method: 'Standard Delivery',
            cost: 5.00
          },
          payment: {
            method: 'Credit Card',
            last4: '4242'
          },
          total: order.metadata?.total || 0,
          date: new Date(order.created_at).toLocaleDateString()
        };
      });

      setOrders(transformedOrders);
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
