
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck,
  CreditCard,
  ShoppingCart,
  User
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { UnifiedOrderStatus, getUnifiedStatusLabel, getStatusProgress } from '@/utils/unifiedOrderStatusUtils';

interface OrderStatusCardProps {
  order: {
    unified_status?: UnifiedOrderStatus;
    created_at: string;
    paid_at?: string | null;
    processing_started_at?: string | null;
    ready_for_pickup_at?: string | null;
    assigned_at?: string | null;
    picked_up_at?: string | null;
    delivered_at?: string | null;
    cancelled_at?: string | null;
    driver_id?: string | null;
  };
}

const unifiedStatusConfig: Record<UnifiedOrderStatus, { icon: React.ReactNode; color: string; label: string }> = {
  pending_payment: { 
    icon: <CreditCard className="h-5 w-5" />, 
    color: 'text-yellow-500 bg-yellow-50 border-yellow-200', 
    label: 'Pending Payment' 
  },
  paid: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-green-500 bg-green-50 border-green-200', 
    label: 'Payment Confirmed' 
  },
  processing: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-blue-500 bg-blue-50 border-blue-200', 
    label: 'Processing' 
  },
  ready_for_pickup: { 
    icon: <ShoppingCart className="h-5 w-5" />, 
    color: 'text-purple-500 bg-purple-50 border-purple-200', 
    label: 'Ready for Pickup' 
  },
  assigned_to_driver: { 
    icon: <User className="h-5 w-5" />, 
    color: 'text-indigo-500 bg-indigo-50 border-indigo-200', 
    label: 'Driver Assigned' 
  },
  picked_up: { 
    icon: <Package className="h-5 w-5" />, 
    color: 'text-orange-500 bg-orange-50 border-orange-200', 
    label: 'Picked Up' 
  },
  out_for_delivery: { 
    icon: <Truck className="h-5 w-5" />, 
    color: 'text-amber-500 bg-amber-50 border-amber-200', 
    label: 'Out for Delivery' 
  },
  delivered: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: 'text-emerald-500 bg-emerald-50 border-emerald-200', 
    label: 'Delivered' 
  },
  failed_delivery: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-red-500 bg-red-50 border-red-200', 
    label: 'Delivery Failed' 
  },
  cancelled: { 
    icon: <XCircle className="h-5 w-5" />, 
    color: 'text-gray-500 bg-gray-50 border-gray-200', 
    label: 'Cancelled' 
  },
  refunded: { 
    icon: <CreditCard className="h-5 w-5" />, 
    color: 'text-gray-500 bg-gray-50 border-gray-200', 
    label: 'Refunded' 
  }
};

const orderSteps = [
  { status: 'pending_payment' as UnifiedOrderStatus, label: 'Payment Processing', key: 'created_at' },
  { status: 'paid' as UnifiedOrderStatus, label: 'Payment Confirmed', key: 'paid_at' },
  { status: 'processing' as UnifiedOrderStatus, label: 'Order Processing', key: 'processing_started_at' },
  { status: 'ready_for_pickup' as UnifiedOrderStatus, label: 'Ready for Pickup', key: 'ready_for_pickup_at' },
  { status: 'assigned_to_driver' as UnifiedOrderStatus, label: 'Driver Assigned', key: 'assigned_at' },
  { status: 'picked_up' as UnifiedOrderStatus, label: 'Picked Up', key: 'picked_up_at' },
  { status: 'out_for_delivery' as UnifiedOrderStatus, label: 'Out for Delivery', key: 'picked_up_at' },
  { status: 'delivered' as UnifiedOrderStatus, label: 'Delivered', key: 'delivered_at' }
];

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ order }) => {
  const currentStatus = order.unified_status || 'pending_payment';
  const config = unifiedStatusConfig[currentStatus];
  const progress = getStatusProgress(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  const getStepTimestamp = (stepKey: string) => {
    return (order as any)[stepKey];
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Order Status
          <Badge className={`${config.color} border`}>
            <span className="flex items-center gap-1">
              {config.icon}
              {config.label}
            </span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Placed on {new Date(order.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        {!isCancelled && (
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        )}

        {/* Status Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {orderSteps.map((step, index) => {
              const currentStepIndex = orderSteps.findIndex(s => s.status === currentStatus);
              const isCompleted = index <= currentStepIndex && !isCancelled;
              const isCurrent = step.status === currentStatus && !isCancelled;
              const timestamp = getStepTimestamp(step.key);
              
              return (
                <div key={step.status} className="relative flex items-start">
                  <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                    {timestamp && (
                      <p className="text-sm text-gray-500 mt-1">
                        {formatTimestamp(timestamp)}
                      </p>
                    )}
                    {isCurrent && !isCancelled && (
                      <p className="text-sm text-blue-600 mt-1">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Driver info */}
        {order.driver_id && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <User className="h-4 w-4" />
              <span className="font-medium">Driver assigned to your order</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Your order is being handled by a delivery driver
            </p>
          </div>
        )}
        
        {/* Cancelled status */}
        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="h-4 w-4" />
              <span className="font-medium">Order Cancelled</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              This order has been cancelled. If you have any questions, please contact our customer support.
            </p>
            {order.cancelled_at && (
              <p className="text-sm text-red-500 mt-2">
                Cancelled on {formatTimestamp(order.cancelled_at)}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
