
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
import { getStatusColor, getNextStatus, getStatusLabel } from '@/utils/orderStatusUtils';
import { mockDriverProfile, mockAvailableOrders, mockAssignedOrders } from '@/data/mockDriverData';

const DriverDashboard = () => {
  const { driverProfile, signOut, updateAvailability } = useDriverAuth();
  const { availableOrders, assignedOrders, loading, acceptOrder, updateOrderStatus, refreshOrders } = useDriverOrders(driverProfile?.id);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);

  // Use mock data if not authenticated
  const currentProfile = driverProfile || mockDriverProfile;
  const currentAvailableOrders = driverProfile ? availableOrders : mockAvailableOrders;
  const currentAssignedOrders = driverProfile ? assignedOrders : mockAssignedOrders;
  const currentLoading = driverProfile ? loading : false;

  const handleAvailabilityChange = async (isAvailable: boolean) => {
    if (!driverProfile) {
      toast.success(`Mock: You are now ${isAvailable ? 'available' : 'offline'}`);
      return;
    }

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
    if (!driverProfile) {
      toast.success('Mock: Order accepted successfully!');
      return;
    }

    try {
      await acceptOrder(orderId);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    if (!driverProfile) {
      toast.success(`Mock: Order marked as ${status.replace('_', ' ')}`);
      return;
    }

    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleSignOut = () => {
    if (!driverProfile) {
      toast.info('Mock mode - no actual sign out needed');
      return;
    }
    signOut();
  };

  const handleRefreshOrders = () => {
    if (!driverProfile) {
      toast.info('Mock mode - orders refreshed');
      return;
    }
    refreshOrders();
  };

  if (currentLoading) {
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
      {!driverProfile && (
        <div className="bg-yellow-100 border-b border-yellow-200 p-2 text-center">
          <p className="text-yellow-800 text-sm">
            🚧 Mock Mode - You're viewing sample data for development
          </p>
        </div>
      )}
      
      <DriverHeader
        driverProfile={currentProfile}
        onSignOut={handleSignOut}
        onAvailabilityChange={handleAvailabilityChange}
        updatingAvailability={updatingAvailability}
      />

      <div className="p-4 space-y-6">
        <OrderStatsCards
          availableCount={currentAvailableOrders.length}
          assignedCount={currentAssignedOrders.length}
        />

        {/* Refresh Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleRefreshOrders} disabled={currentLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Orders
          </Button>
        </div>

        {/* Assigned Orders */}
        {currentAssignedOrders.length > 0 && (
          <OrdersList
            orders={currentAssignedOrders}
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
        {currentProfile?.is_available ? (
          <OrdersList
            orders={currentAvailableOrders}
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
