
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin, Package, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  display_id: number;
  status: string;
  delivery_status: string;
  email: string;
  shipping_address_id: string;
  created_at: string;
}

interface OrderCardProps {
  order: Order;
  type: 'available' | 'assigned';
  onAcceptOrder?: (orderId: string) => void;
  onStatusUpdate?: (orderId: string, status: string) => void;
  getStatusColor: (status: string) => string;
  getNextStatus: (status: string) => string | null;
  getStatusLabel: (status: string) => string;
}

const OrderCard = ({ 
  order, 
  type, 
  onAcceptOrder, 
  onStatusUpdate, 
  getStatusColor, 
  getNextStatus, 
  getStatusLabel 
}: OrderCardProps) => {
  const borderColor = type === 'available' ? 'border-l-green-500' : 'border-l-blue-500';
  const badgeStyle = type === 'available' ? 'bg-green-100 text-green-800' : getStatusColor(order.delivery_status);
  const badgeText = type === 'available' ? 'Ready for Pickup' : order.delivery_status.replace('_', ' ');

  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Order #{order.display_id}</span>
            <Badge className={badgeStyle}>
              {badgeText}
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

        {type === 'available' && onAcceptOrder && (
          <Button
            onClick={() => onAcceptOrder(order.id)}
            className="w-full"
            size="sm"
          >
            <Package className="h-4 w-4 mr-2" />
            Accept Order
          </Button>
        )}

        {type === 'assigned' && onStatusUpdate && getNextStatus(order.delivery_status) && (
          <Button
            onClick={() => onStatusUpdate(order.id, getNextStatus(order.delivery_status)!)}
            className="w-full"
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {getStatusLabel(getNextStatus(order.delivery_status)!)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
