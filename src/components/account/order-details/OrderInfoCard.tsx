
import React from 'react';
import { MapPin, CreditCard, CalendarClock } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';

interface OrderInfoCardProps {
  order: {
    shipping: {
      address: string;
      method: string;
    };
    payment: {
      method: string;
      last4?: string;
    };
    date: string;
  };
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ order }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            Shipping Address
          </h3>
          <p className="text-sm text-gray-600">{order.shipping.address}</p>
          <p className="text-sm text-gray-600">Method: {order.shipping.method}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment Method
          </h3>
          <p className="text-sm text-gray-600">
            {order.payment.method} 
            {order.payment.last4 && <span> ending in {order.payment.last4}</span>}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium flex items-center mb-2">
            <CalendarClock className="h-4 w-4 mr-2" />
            Order Date
          </h3>
          <p className="text-sm text-gray-600">{order.date}</p>
        </div>
      </CardContent>
    </Card>
  );
};
