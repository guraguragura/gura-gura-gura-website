
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, User, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  UnifiedOrderStatus, 
  getUnifiedStatusLabel, 
  getUnifiedStatusColor, 
  getStatusProgress 
} from '@/utils/unifiedOrderStatusUtils';
import { useCurrency } from '@/hooks/useCurrency';
import { CustomerOrderDetails } from '@/hooks/useCustomerOrders';

interface CustomerOrderCardProps {
  order: CustomerOrderDetails;
}

const CustomerOrderCard: React.FC<CustomerOrderCardProps> = ({ order }) => {
  const { formatPrice } = useCurrency();
  const progress = getStatusProgress(order.unified_status);
  const statusColor = getUnifiedStatusColor(order.unified_status);
  const statusLabel = getUnifiedStatusLabel(order.unified_status);

  const getStatusIcon = (status: UnifiedOrderStatus) => {
    switch (status) {
      case 'pending_payment':
      case 'paid':
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'ready_for_pickup':
      case 'assigned_to_driver':
      case 'picked_up':
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed_delivery':
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEstimatedDelivery = () => {
    if (order.unified_status === 'delivered') {
      return `Delivered on ${new Date(order.delivered_at!).toLocaleDateString()}`;
    }
    
    if (order.unified_status === 'out_for_delivery') {
      return 'Arriving today';
    }
    
    if (order.unified_status === 'picked_up') {
      return 'Out for delivery soon';
    }
    
    if (order.assigned_at) {
      const assignedDate = new Date(order.assigned_at);
      const estimatedDelivery = new Date(assignedDate);
      estimatedDelivery.setHours(estimatedDelivery.getHours() + 2); // 2 hours estimate
      return `Est. delivery: ${estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return 'Processing order';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Order #{order.display_id}</h3>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatPrice(order.total)}</p>
            <Badge className={`${statusColor} text-xs`}>
              <span className="flex items-center gap-1">
                {getStatusIcon(order.unified_status)}
                {statusLabel}
              </span>
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Order Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Status Details */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">{getEstimatedDelivery()}</p>
          {order.driver_id && (
            <div className="flex items-center text-sm text-blue-600 mt-1">
              <User className="h-3 w-3 mr-1" />
              Driver assigned
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Link 
            to={`/account/orders/${order.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderCard;
