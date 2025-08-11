
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/hooks/useCurrency";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_date: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
}

const ReturnRequestForm = () => {
  const { orderId, orderItemId } = useParams<{ orderId: string; orderItemId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mocked order data
        const mockedOrder: Order = {
          id: orderId || '123',
          order_date: '2024-07-20',
          total_amount: 49.99,
          status: 'delivered',
          items: [
            {
              id: orderItemId || '456',
              name: 'Sample Product',
              quantity: 1,
              price: 49.99,
            },
          ],
        };
        setOrder(mockedOrder);
      } catch (err) {
        setError('Failed to load order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, orderItemId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast({
        title: "Error",
        description: "Please provide a reason for the return.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Return request submitted successfully!",
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Error Loading Order</h3>
        <p className="text-gray-500 mt-2">
          We couldn't load the order details. Please try again later.
        </p>
      </div>
    );
  }

  if (order.status !== "delivered") {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Return Not Available</h3>
        <p className="text-gray-500 mt-2">
          Only delivered orders can be returned.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Request a Return</h2>
      <p className="mb-4">Order ID: {order.id}</p>
      {order.items.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {formatPrice(item.price)}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="reason">Reason for Return</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe why you are returning this item."
            required
          />
        </div>
        <div>
          <Button type="submit">Submit Return Request</Button>
          <Link to="/account/returns">
            <Button variant="ghost">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ReturnRequestForm;
