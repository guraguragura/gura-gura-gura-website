
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    discount_price?: number;
  };
  quantity?: number;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  className,
}) => {
  const { addItem } = useCartContext();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      discount_price: product.discount_price,
      thumbnail: product.thumbnail,
      quantity,
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <Button 
      onClick={handleAddToCart}
      className={`min-h-[36px] ${className}`}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Check className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">Added to Cart</span>
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">Add to Cart</span>
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
