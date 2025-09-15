
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

// Type guard for metadata
const isMetadataWithTotal = (metadata: any): metadata is { total: number } => {
  return metadata && typeof metadata === 'object' && typeof metadata.total === 'number';
};

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

  const fetchOrderAddresses = async (shippingAddressId: string | null, billingAddressId: string | null) => {
    try {
      if (!shippingAddressId) return null;
      
      const { data: addressData, error: addressError } = await supabase
        .from('order_address')
        .select('*')
        .eq('id', shippingAddressId)
        .single();
      
      if (addressError) {
        console.warn('Error fetching address:', addressError);
        return null;
      }
      
      return addressData;
    } catch (error) {
      console.warn('Error in fetchOrderAddresses:', error);
      return null;
    }
  };

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      console.log('Fetching orders for user:', user.email);

      // First, fetch orders without joins to avoid schema issues
      const { data: ordersData, error: ordersError } = await supabase
        .from('order')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      console.log('Raw orders data:', ordersData);

      // Transform the data and fetch addresses separately
      const transformedOrders: CustomerOrderDetails[] = await Promise.all(
        (ordersData || []).map(async (order) => {
          // Safely access metadata total
          let total = 0;
          if (isMetadataWithTotal(order.metadata)) {
            total = order.metadata.total;
          } else if (typeof order.metadata === 'string') {
            try {
              const parsedMetadata = JSON.parse(order.metadata);
              if (isMetadataWithTotal(parsedMetadata)) {
                total = parsedMetadata.total;
              }
            } catch (e) {
              console.warn('Failed to parse metadata:', e);
            }
          }

          // Fetch shipping address if available
          const shippingAddress = await fetchOrderAddresses(order.shipping_address_id, order.billing_address_id);
          
          // Build address string
          const addressParts = [];
          if (shippingAddress) {
            if (shippingAddress.address_1) addressParts.push(shippingAddress.address_1);
            if (shippingAddress.address_2) addressParts.push(shippingAddress.address_2);
            if (shippingAddress.city) addressParts.push(shippingAddress.city);
            if (shippingAddress.province) addressParts.push(shippingAddress.province);
            if (shippingAddress.postal_code) addressParts.push(shippingAddress.postal_code);
          }

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
            // For now, use mock items until we implement proper item fetching
            items: [
              {
                id: 'mock-item-1',
                name: 'Order Item',
                quantity: 1,
                price: total,
                subtotal: total,
                thumbnail: '/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png'
              }
            ],
            shipping: {
              address: addressParts.length > 0 ? addressParts.join(', ') : 'Address not available',
              method: 'Standard Delivery',
              cost: 5.00
            },
            payment: {
              method: 'Credit Card',
              last4: '4242'
            },
            total: total || 0,
            date: new Date(order.created_at).toLocaleDateString()
          };
        })
      );

      console.log('Transformed orders:', transformedOrders);
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
