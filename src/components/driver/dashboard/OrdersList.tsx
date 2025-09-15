
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Truck } from 'lucide-react';
import OrderCard from './OrderCard';

interface Order {
  id: string;
  display_id: number;
  status: string;
  delivery_status: string;
  email: string;
  shipping_address_id: string;
  created_at: string;
}

interface OrdersListProps {
  orders: Order[];
  title: string;
  type: 'available' | 'assigned';
  emptyMessage: string;
  emptySubMessage: string;
  onAcceptOrder?: (orderId: string) => void;
  onStatusUpdate?: (orderId: string, status: string) => void;
  getStatusColor: (status: string) => string;
  getNextStatus: (status: string) => string | null;
  getStatusLabel: (status: string) => string;
}

const OrdersList = ({ 
  orders, 
  title, 
  type, 
  emptyMessage, 
  emptySubMessage, 
  onAcceptOrder, 
  onStatusUpdate, 
  getStatusColor, 
  getNextStatus, 
  getStatusLabel 
}: OrdersListProps) => {
  const EmptyIcon = type === 'available' ? Package : Truck;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-gray-900">{title}</h2>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <EmptyIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{emptyMessage}</p>
            <p className="text-sm text-gray-500 mt-1">{emptySubMessage}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              type={type}
              onAcceptOrder={onAcceptOrder}
              onStatusUpdate={onStatusUpdate}
              getStatusColor={getStatusColor}
              getNextStatus={getNextStatus}
              getStatusLabel={getStatusLabel}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersList;
