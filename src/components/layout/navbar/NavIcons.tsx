
import React from 'react';
import { User, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CartButton } from '@/components/cart/CartButton';

const NavIcons = () => {
  return (
    <div className="flex items-center space-x-2">
      <CartButton />
      <Button variant="ghost" size="icon" asChild>
        <Link to="/account/wishlist">
          <Heart className="h-5 w-5" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link to="/account">
          <User className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default NavIcons;
