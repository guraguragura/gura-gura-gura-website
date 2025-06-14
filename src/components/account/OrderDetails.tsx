
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from '@/hooks/use-toast';
import { useCustomerOrders } from '@/hooks/useCustomerOrders';

// Import refactored components
import { OrderStatusCard } from './order-details/OrderStatusCard';
import { OrderInfoCard } from './order-details/OrderInfoCard';
import { OrderItemsTable } from './order-details/OrderItemsTable';
import { OrderActions } from './order-details/OrderActions';
import { OrderNotFound } from './order-details/OrderNotFound';

export const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { formatPrice, isLoading } = useCurrency();
  const { orders } = useCustomerOrders();
  
  const order = orders.find(o => o.id === orderId);

  const goBack = () => {
    navigate('/account/orders');
  };

  const handleCancelOrder = () => {
    toast({
      title: "Order cancellation requested",
      description: `Cancellation request for order #${order?.display_id} has been submitted.`,
    });
  };

  const handleReturnOrder = () => {
    if (order) {
      // For now, just show a toast - this would integrate with a returns system
      toast({
        title: "Return request initiated",
        description: `Return request for order #${order.display_id} has been started.`,
      });
    }
  };

  if (!order) {
    return <OrderNotFound onGoBack={goBack} />;
  }

  const isOrderCancelled = order.unified_status === 'cancelled';
  const isOrderDelivered = order.unified_status === 'delivered';

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <h2 className="text-2xl font-bold">Order #{order.display_id}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrderStatusCard order={order} />
        <OrderInfoCard order={order} />
      </div>

      <OrderItemsTable 
        order={order} 
        formatPrice={formatPrice} 
        isLoading={isLoading} 
      />

      <OrderActions 
        isOrderCancelled={isOrderCancelled}
        isOrderDelivered={isOrderDelivered}
        onReturnOrder={handleReturnOrder}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
};
