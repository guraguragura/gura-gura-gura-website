
import React, { useState } from 'react';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import { useDriverOrders } from '@/hooks/useDriverOrders';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Truck, RefreshCw } from 'lucide-react';
import DriverHeader from './dashboard/DriverHeader';
import OrderStatsCards from './dashboard/OrderStatsCards';
import OrdersList from './dashboard/OrdersList';
import OfflineMessage from './dashboard/OfflineMessage';

const DriverDashboard = () => {
  const { driverProfile, signOut, updateAvailability } = useDriverAuth();
  const { availableOrders, assignedOrders, loading, acceptOrder, updateOrderStatus, refreshOrders } = useDriverOrders(driverProfile?.id);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);

  const handleAvailabilityChange = async (isAvailable: boolean) => {
    setUpdatingAvailability(true);
    try {
      await updateAvailability(isAvailable);
      toast.success(`You are now ${isAvailable ? 'available' : 'offline'}`);
    } catch (error) {
      toast.error('Failed to update availability');
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await acceptOrder(orderId);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned_to_driver': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'assigned_to_driver': return 'picked_up';
      case 'picked_up': return 'out_for_delivery';
      case 'out_for_delivery': return 'delivered';
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'picked_up': return 'Mark as Picked Up';
      case 'out_for_delivery': return 'Mark Out for Delivery';
      case 'delivered': return 'Mark as Delivered';
      default: return 'Update Status';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Truck className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverHeader
        driverProfile={driverProfile!}
        onSignOut={signOut}
        onAvailabilityChange={handleAvailabilityChange}
        updatingAvailability={updatingAvailability}
      />

      <div className="p-4 space-y-6">
        <OrderStatsCards
          availableCount={availableOrders.length}
          assignedCount={assignedOrders.length}
        />

        {/* Refresh Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={refreshOrders} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Orders
          </Button>
        </div>

        {/* Assigned Orders */}
        {assignedOrders.length > 0 && (
          <OrdersList
            orders={assignedOrders}
            title="My Orders"
            type="assigned"
            emptyMessage="No assigned orders"
            emptySubMessage="Orders will appear here when assigned"
            onStatusUpdate={handleStatusUpdate}
            getStatusColor={getStatusColor}
            getNextStatus={getNextStatus}
            getStatusLabel={getStatusLabel}
          />
        )}

        {/* Available Orders */}
        {driverProfile?.is_available ? (
          <OrdersList
            orders={availableOrders}
            title="Available Orders"
            type="available"
            emptyMessage="No orders available at the moment"
            emptySubMessage="New orders will appear here when ready"
            onAcceptOrder={handleAcceptOrder}
            getStatusColor={getStatusColor}
            getNextStatus={getNextStatus}
            getStatusLabel={getStatusLabel}
          />
        ) : (
          <OfflineMessage />
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
