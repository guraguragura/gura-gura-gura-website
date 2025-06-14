import React, { useState } from 'react';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import { useDriverOrders } from '@/hooks/useDriverOrders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  LogOut, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck,
  User,
  Phone,
  RefreshCw
} from 'lucide-react';

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {driverProfile?.first_name} {driverProfile?.last_name}
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Driver Dashboard
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Availability Toggle */}
          <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${driverProfile?.is_available ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium">
                {driverProfile?.is_available ? 'Available' : 'Offline'}
              </span>
            </div>
            <Switch
              checked={driverProfile?.is_available || false}
              onCheckedChange={handleAvailabilityChange}
              disabled={updatingAvailability}
            />
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{availableOrders.length}</div>
              <div className="text-sm text-gray-600">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{assignedOrders.length}</div>
              <div className="text-sm text-gray-600">Assigned</div>
            </CardContent>
          </Card>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={refreshOrders} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Orders
          </Button>
        </div>

        {/* Assigned Orders */}
        {assignedOrders.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">My Orders</h2>
            <div className="space-y-3">
              {assignedOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Order #{order.display_id}</span>
                        <Badge className={getStatusColor(order.delivery_status)}>
                          {order.delivery_status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        Customer: {order.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        Delivery Address: #{order.shipping_address_id}
                      </div>
                    </div>

                    {getNextStatus(order.delivery_status) && (
                      <Button
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.delivery_status)!)}
                        className="w-full"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {getStatusLabel(getNextStatus(order.delivery_status)!)}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Available Orders */}
        {driverProfile?.is_available && (
          <section>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Available Orders</h2>
            {availableOrders.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No orders available at the moment</p>
                  <p className="text-sm text-gray-500 mt-1">New orders will appear here when ready</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {availableOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Order #{order.display_id}</span>
                          <Badge className="bg-green-100 text-green-800">Ready for Pickup</Badge>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          Customer: {order.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          Delivery Address: #{order.shipping_address_id}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="w-full"
                        size="sm"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Accept Order
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {!driverProfile?.is_available && (
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">You're currently offline</p>
              <p className="text-sm text-gray-500 mt-1">Toggle availability to see available orders</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
