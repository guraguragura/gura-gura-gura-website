import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";
import "./ProductActions.css";

interface ProductActionsProps {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail?: string;
    discount_price?: number;
  };
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    navigate(`/checkout?productId=${product.id}`);
  };

  return (
    <div className="actions-container">
      <AddToCartButton 
        product={product}
        className="action-button"
      />
      <Button 
        onClick={handleBuyNow}
        variant="secondary" 
        className="action-button"
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
