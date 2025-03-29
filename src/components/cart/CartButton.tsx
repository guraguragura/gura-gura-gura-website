
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export const CartButton = () => {
  const { totalItems } = useCart();
  
  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link to="/cart">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-white"
            variant="default"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  );
};
