
import React from 'react';
import { User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CartButton } from '@/components/cart/CartButton';
import { useWishlist } from '@/contexts/WishlistContext';
import { useIsMobile } from "@/hooks/use-mobile";

const NavIcons = () => {
  const { wishlist } = useWishlist();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <CartButton />
      <div className="relative">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/account/wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        </Button>
      </div>
      <Button variant="ghost" size="icon" asChild>
        <Link to="/account">
          <User className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default NavIcons;
