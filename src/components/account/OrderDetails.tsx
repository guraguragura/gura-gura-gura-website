
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import { OrderStatusCard } from './order-details/OrderStatusCard';
import { OrderInfoCard } from './order-details/OrderInfoCard';
import { OrderItemsTable } from './order-details/OrderItemsTable';
import { OrderActions } from './order-details/OrderActions';
import { OrderNotFound } from './order-details/OrderNotFound';
import { mockOrderDetails } from './order-details/mock-data';
import { OrderStatus } from './Orders';

const orderSteps = [
  { status: 'pending', label: 'Order Placed' },
  { status: 'processing', label: 'Processing' },
  { status: 'out_for_delivery', label: 'Out for Delivery' },
  { status: 'delivered', label: 'Delivered' }
];

export const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { formatPrice, isLoading } = useCurrency();
  
  const order = orderId ? mockOrderDetails[orderId] : null;

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
    if (order && order.items.length > 0) {
      navigate(`/account/returns/new/${order.id}/${order.items[0].id}`);
    }
  };

  if (!order) {
    return <OrderNotFound onGoBack={goBack} />;
  }

  const currentStepIndex = orderSteps.findIndex(step => step.status === order.status);
  const isOrderCanceled = order.status === 'canceled';
  const isOrderDelivered = order.status === 'delivered';

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
        <OrderStatusCard 
          order={order} 
          currentStepIndex={currentStepIndex}
          isOrderCanceled={isOrderCanceled}
        />
        <OrderInfoCard order={order} />
      </div>

      <OrderItemsTable 
        order={order} 
        formatPrice={formatPrice} 
        isLoading={isLoading} 
      />

      <OrderActions 
        isOrderCanceled={isOrderCanceled}
        isOrderDelivered={isOrderDelivered}
        onReturnOrder={handleReturnOrder}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
};
