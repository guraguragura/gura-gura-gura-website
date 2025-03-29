
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  thumbnail?: string;
}

interface OrderItemsTableProps {
  order: {
    items: OrderItem[];
    shipping: {
      cost: number;
    };
    total: number;
  };
  formatPrice: (price: number) => string;
  isLoading: boolean;
}

export const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ 
  order, 
  formatPrice, 
  isLoading 
}) => {
  return (
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
  );
};
