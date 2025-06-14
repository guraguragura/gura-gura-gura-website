
import React, { useState } from 'react';
import { RefreshCw, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCustomerOrders } from '@/hooks/useCustomerOrders';
import CustomerOrderCard from './CustomerOrderCard';
import { UnifiedOrderStatus } from '@/utils/unifiedOrderStatusUtils';

const Orders = () => {
  const { orders, loading, refreshOrders } = useCustomerOrders();
  const [filterStatus, setFilterStatus] = useState<UnifiedOrderStatus | 'all'>('all');

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.unified_status === filterStatus
  );

  const statusFilters = [
    { value: 'all' as const, label: 'All Orders' },
    { value: 'processing' as UnifiedOrderStatus, label: 'Processing' },
    { value: 'out_for_delivery' as UnifiedOrderStatus, label: 'Out for Delivery' },
    { value: 'delivered' as UnifiedOrderStatus, label: 'Delivered' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500 mt-1">View and track your orders</p>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading your orders...</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500 mt-1">View and track your orders</p>
        </div>
        
        <div className="border rounded-lg p-6 text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500">When you place orders, they'll appear here for tracking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-gray-500 mt-1">View and track your orders</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={refreshOrders}
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={filterStatus === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid gap-4 md:gap-6">
        {filteredOrders.map((order) => (
          <CustomerOrderCard key={order.id} order={order} />
        ))}
      </div>

      {filteredOrders.length === 0 && filterStatus !== 'all' && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found with the selected status.</p>
        </div>
      )}
    </div>
  );
};

export { Orders };
