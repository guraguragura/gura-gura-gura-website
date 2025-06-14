
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck,
  CreditCard,
  ShoppingCart
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { UnifiedOrderStatus, getUnifiedStatusLabel, getStatusProgress } from '@/utils/unifiedOrderStatusUtils';

type OrderStatus = 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'canceled';

interface OrderStatusCardProps {
  order: {
    status: OrderStatus;
    unified_status?: UnifiedOrderStatus;
    date: string;
  };
  currentStepIndex: number;
  isOrderCanceled: boolean;
}

const unifiedStatusConfig: Record<UnifiedOrderStatus, { icon: React.ReactNode; color: string; label: string }> = {
  pending_payment: { 
    icon: <CreditCard className="h-5 w-5" />, 
    color: 'text-yellow-500', 
    label: 'Pending Payment' 
  },
  paid: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-green-500', 
    label: 'Payment Confirmed' 
  },
  processing: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-blue-500', 
    label: 'Processing' 
  },
  ready_for_pickup: { 
    icon: <ShoppingCart className="h-5 w-5" />, 
    color: 'text-purple-500', 
    label: 'Ready for Pickup' 
  },
  assigned_to_driver: { 
    icon: <Truck className="h-5 w-5" />, 
    color: 'text-indigo-500', 
    label: 'Assigned to Driver' 
  },
  picked_up: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-orange-500', 
    label: 'Picked Up' 
  },
  out_for_delivery: { 
    icon: <Truck className="h-5 w-5" />, 
    color: 'text-indigo-500', 
    label: 'Out for Delivery' 
  },
  delivered: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-green-500', 
    label: 'Delivered' 
  },
  failed_delivery: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-red-500', 
    label: 'Delivery Failed' 
  },
  cancelled: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-red-500', 
    label: 'Cancelled' 
  },
  refunded: { 
    icon: <CreditCard className="h-5 w-5" />, 
    color: 'text-gray-500', 
    label: 'Refunded' 
  }
};

// Fallback to legacy status config for backward compatibility
const statusConfig: Record<OrderStatus, { icon: React.ReactNode; color: string; label: string }> = {
  pending: { 
    icon: <Clock className="h-5 w-5" />, 
    color: 'text-yellow-500', 
    label: 'Pending' 
  },
  processing: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-blue-500', 
    label: 'Processing' 
  },
  out_for_delivery: { 
    icon: <Truck className="h-5 w-5" />, 
    color: 'text-indigo-500', 
    label: 'Out for Delivery' 
  },
  delivered: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-green-500', 
    label: 'Delivered' 
  },
  canceled: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-red-500', 
    label: 'Canceled' 
  }
};

const orderSteps = [
  { status: 'pending_payment', label: 'Payment Processing' },
  { status: 'paid', label: 'Payment Confirmed' },
  { status: 'processing', label: 'Order Processing' },
  { status: 'ready_for_pickup', label: 'Ready for Pickup' },
  { status: 'assigned_to_driver', label: 'Assigned to Driver' },
  { status: 'picked_up', label: 'Picked Up' },
  { status: 'out_for_delivery', label: 'Out for Delivery' },
  { status: 'delivered', label: 'Delivered' }
];

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ 
  order, 
  currentStepIndex, 
  isOrderCanceled 
}) => {
  // Use unified status if available, fallback to legacy status
  const currentStatus = order.unified_status || order.status;
  const config = order.unified_status 
    ? unifiedStatusConfig[order.unified_status] 
    : statusConfig[order.status];

  const progress = order.unified_status ? getStatusProgress(order.unified_status) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Placed on {order.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center text-lg font-medium ${config.color} mb-6`}>
          {config.icon}
          <span className="ml-2">{config.label}</span>
        </div>

        {/* Progress bar for unified status */}
        {order.unified_status && !isOrderCanceled && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {!isOrderCanceled && order.unified_status && (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            <div className="space-y-8">
              {orderSteps.map((step, index) => {
                const stepStatus = step.status as UnifiedOrderStatus;
                const isCompleted = orderSteps.findIndex(s => s.status === currentStatus) >= index;
                const isCurrent = step.status === currentStatus;
                
                return (
                  <div key={step.status} className="relative flex items-center">
                    <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    } ${isCurrent ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-gray-500">
                          {stepStatus === 'pending_payment' && 'Processing your payment...'}
                          {stepStatus === 'paid' && 'Payment confirmed. Preparing your order.'}
                          {stepStatus === 'processing' && 'Your order is being prepared.'}
                          {stepStatus === 'ready_for_pickup' && 'Your order is ready for pickup.'}
                          {stepStatus === 'assigned_to_driver' && 'A driver has been assigned to your order.'}
                          {stepStatus === 'picked_up' && 'Your order has been picked up by the driver.'}
                          {stepStatus === 'out_for_delivery' && 'Your order is on its way to you.'}
                          {stepStatus === 'delivered' && 'Your order has been delivered.'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Fallback for legacy status display */}
        {!order.unified_status && !isOrderCanceled && (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            <div className="space-y-8">
              {['pending', 'processing', 'out_for_delivery', 'delivered'].map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step} className="relative flex items-center">
                    <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    } ${isCurrent ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step === 'pending' && 'Order Placed'}
                        {step === 'processing' && 'Processing'}
                        {step === 'out_for_delivery' && 'Out for Delivery'}
                        {step === 'delivered' && 'Delivered'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {isOrderCanceled && (
          <div className="border border-red-200 bg-red-50 rounded-md p-4 text-red-500">
            <p>This order has been canceled. If you have any questions, please contact our customer support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
