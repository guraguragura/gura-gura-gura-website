
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { Card } from '@/components/ui/card';

const CartSummary = () => {
  const { subtotal, total } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <Card className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>
        
        <div className="pt-3 border-t">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      
      <Button className="w-full mb-3" size="lg" asChild>
        <Link to="/checkout">
          Proceed to Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      
      <Button variant="outline" className="w-full" size="lg" asChild>
        <Link to="/">
          Continue Shopping
        </Link>
      </Button>
    </Card>
  );
};

export default CartSummary;
