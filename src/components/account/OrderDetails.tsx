import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Clock, 
  Package, 
  CheckCircle, 
  Truck, 
  XCircle,
  Box,
  MapPin,
  CreditCard,
  CalendarClock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderStatus } from './Orders';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  thumbnail?: string;
}

interface OrderDetails {
  id: string;
  display_id: number;
  status: OrderStatus;
  date: string;
  total: number;
  items: OrderItem[];
  shipping: {
    address: string;
    method: string;
    cost: number;
  };
  payment: {
    method: string;
    last4?: string;
  };
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

const mockOrderDetails: Record<string, OrderDetails> = {
  'ord_1234': {
    id: 'ord_1234',
    display_id: 1234,
    status: 'pending',
    date: '2023-11-01',
    total: 124.99,
    items: [
      { id: 'item_1', name: 'Wireless Headphones', quantity: 1, price: 89.99, subtotal: 89.99, thumbnail: '/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png' },
      { id: 'item_2', name: 'Phone Case', quantity: 1, price: 24.99, subtotal: 24.99, thumbnail: '/lovable-uploads/61870ac8-67b1-4faf-9fa6-e40f60010b9d.png' },
    ],
    shipping: {
      address: '123 Main St, Anytown, AN 12345',
      method: 'Standard Shipping',
      cost: 10.00
    },
    payment: {
      method: 'Credit Card',
      last4: '4242'
    }
  },
  'ord_2345': {
    id: 'ord_2345',
    display_id: 2345,
    status: 'processing',
    date: '2023-10-27',
    total: 79.95,
    items: [
      { id: 'item_3', name: 'Smart Watch', quantity: 1, price: 79.95, subtotal: 79.95, thumbnail: '/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png' },
    ],
    shipping: {
      address: '456 Oak Ave, Somewhere, SW 67890',
      method: 'Express Shipping',
      cost: 15.00
    },
    payment: {
      method: 'PayPal'
    }
  },
  'ord_3456': {
    id: 'ord_3456',
    display_id: 3456,
    status: 'out_for_delivery',
    date: '2023-10-20',
    total: 249.50,
    items: [
      { id: 'item_4', name: 'Bluetooth Speaker', quantity: 1, price: 129.99, subtotal: 129.99, thumbnail: '/lovable-uploads/2b4f1e1c-8388-4e0a-a05c-1efa3ecbb777.png' },
      { id: 'item_5', name: 'Wireless Charger', quantity: 2, price: 49.99, subtotal: 99.98, thumbnail: '/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png' },
      { id: 'item_6', name: 'USB Cable', quantity: 1, price: 9.99, subtotal: 9.99, thumbnail: '/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png' },
    ],
    shipping: {
      address: '789 Pine St, Elsewhere, EL 13579',
      method: 'Next Day Delivery',
      cost: 20.00
    },
    payment: {
      method: 'Credit Card',
      last4: '1234'
    }
  },
  'ord_4567': {
    id: 'ord_4567',
    display_id: 4567,
    status: 'delivered',
    date: '2023-10-15',
    total: 54.99,
    items: [
      { id: 'item_7', name: 'T-Shirt', quantity: 1, price: 29.99, subtotal: 29.99, thumbnail: '/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png' },
      { id: 'item_8', name: 'Socks', quantity: 5, price: 4.99, subtotal: 24.95, thumbnail: '/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png' },
    ],
    shipping: {
      address: '321 Maple Rd, Nowhere, NW 24680',
      method: 'Standard Shipping',
      cost: 5.00
    },
    payment: {
      method: 'Credit Card',
      last4: '5678'
    }
  },
  'ord_5678': {
    id: 'ord_5678',
    display_id: 5678,
    status: 'canceled',
    date: '2023-10-10',
    total: 199.99,
    items: [
      { id: 'item_9', name: 'Tablet', quantity: 1, price: 199.99, subtotal: 199.99, thumbnail: '/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png' },
    ],
    shipping: {
      address: '654 Cedar Ln, Anyplace, AP 97531',
      method: 'Standard Shipping',
      cost: 10.00
    },
    payment: {
      method: 'Credit Card',
      last4: '9012'
    }
  }
};

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
    toast({
      title: "Return request initiated",
      description: `Return request for order #${order?.display_id} has been initiated.`,
    });
  };

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={goBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </div>
        <div className="border rounded-lg p-6 text-center py-12">
          <p className="text-gray-500">Order not found. The order may have been removed or the ID is incorrect.</p>
          <Button onClick={goBack} className="mt-4">View All Orders</Button>
        </div>
      </div>
    );
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items in your order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.thumbnail && (
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {isLoading ? '...' : formatPrice(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {isLoading ? '...' : formatPrice(item.subtotal)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col items-end border-t p-4">
          <div className="space-y-1 text-sm w-1/3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{isLoading ? '...' : formatPrice(order.total - order.shipping.cost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{isLoading ? '...' : formatPrice(order.shipping.cost)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total:</span>
              <span>{isLoading ? '...' : formatPrice(order.total)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">
          Need Help?
        </Button>
        {!isOrderCanceled && (
          isOrderDelivered ? (
            <Button 
              onClick={handleReturnOrder}
              className="bg-[#F2FCE2] text-green-700 hover:bg-green-100 border border-green-200"
            >
              Return Order
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleCancelOrder}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Cancel Order
            </Button>
          )
        )}
      </div>
    </div>
  );
};
