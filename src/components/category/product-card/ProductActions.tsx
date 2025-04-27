
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductActionsProps {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    discount_price?: number;
  };
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    navigate(`/checkout?productId=${product.id}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <AddToCartButton 
        product={product}
        className="w-full py-2 text-sm"
      />
      <Button 
        onClick={handleBuyNow}
        variant="secondary" 
        className="w-full py-2 text-sm"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
