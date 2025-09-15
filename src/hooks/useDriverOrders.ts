
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UnifiedOrderStatus } from '@/utils/unifiedOrderStatusUtils';

interface Order {
  id: string;
  display_id: number;
  status: string;
  unified_status: UnifiedOrderStatus;
  delivery_status: string;
  customer_id: string;
  shipping_address_id: string;
  billing_address_id: string;
  currency_code: string;
  email: string;
  driver_id: string | null;
  assigned_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
  metadata: any;
}

export const useDriverOrders = (driverProfileId?: string) => {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [assignedOrders, setAssignedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (driverProfileId) {
      fetchOrders();
      
      // Subscribe to real-time updates
      const channel = supabase
        .channel('driver-orders')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'order'
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
  }, [driverProfileId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      // Fetch available orders (ready for pickup, unassigned)
      const { data: available, error: availableError } = await supabase
        .from('order')
        .select('*')
        .eq('unified_status', 'ready_for_pickup')
        .is('driver_id', null)
        .order('created_at', { ascending: true });

      if (availableError) throw availableError;

      // Fetch assigned orders for this driver
      const { data: assigned, error: assignedError } = await supabase
        .from('order')
        .select('*')
        .eq('driver_id', driverProfileId)
        .in('unified_status', ['assigned_to_driver', 'picked_up', 'out_for_delivery'])
        .order('assigned_at', { ascending: true });

      if (assignedError) throw assignedError;

      setAvailableOrders(available || []);
      setAssignedOrders(assigned || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: string) => {
    if (!driverProfileId) return;

    try {
      const { error } = await supabase
        .from('order')
        .update({
          driver_id: driverProfileId,
          unified_status: 'assigned_to_driver',
          assigned_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Order accepted successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
      toast.error('Failed to accept order');
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: UnifiedOrderStatus) => {
    try {
      const updateData: any = { unified_status: status };
      
      // The timestamp updates are now handled by the database trigger
      // but we can still set them explicitly if needed
      if (status === 'picked_up') {
        updateData.picked_up_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('order')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      toast.success(`Order marked as ${status.replace('_', ' ')}`);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      throw error;
    }
  };

  return {
    availableOrders,
    assignedOrders,
    loading,
    acceptOrder,
    updateOrderStatus,
    refreshOrders: fetchOrders
  };
};
