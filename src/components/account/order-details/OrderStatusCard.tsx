
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck 
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { OrderStatus } from '../Orders';

interface OrderStatusCardProps {
  order: {
    status: OrderStatus;
    date: string;
  };
  currentStepIndex: number;
  isOrderCanceled: boolean;
}

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
  { status: 'pending', label: 'Order Placed' },
  { status: 'processing', label: 'Processing' },
  { status: 'out_for_delivery', label: 'Out for Delivery' },
  { status: 'delivered', label: 'Delivered' }
];

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ 
  order, 
  currentStepIndex, 
  isOrderCanceled 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Placed on {order.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center text-lg font-medium ${statusConfig[order.status].color} mb-6`}>
          {statusConfig[order.status].icon}
          <span className="ml-2">{statusConfig[order.status].label}</span>
        </div>

        {!isOrderCanceled && (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            <div className="space-y-8">
              {orderSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
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
                          {step.status === 'pending' && 'We have received your order.'}
                          {step.status === 'processing' && 'Your order is being prepared.'}
                          {step.status === 'out_for_delivery' && 'Your order is on its way to you.'}
                          {step.status === 'delivered' && 'Your order has been delivered.'}
                        </p>
                      )}
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
