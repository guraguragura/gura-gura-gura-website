
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Your shopping cart is empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any products to your cart yet. 
        Browse our catalog to find products you'll love.
      </p>
      <Button size="lg" asChild>
        <Link to="/">
          Continue Shopping
        </Link>
      </Button>
    </div>
  );
};

export default CartEmpty;
