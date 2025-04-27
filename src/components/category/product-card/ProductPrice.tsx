import React from "react";

interface ProductPriceProps {
  price: number;
  discount_price?: number;
  formatPrice: (price: number) => string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, discount_price, formatPrice }) => {
  return (
    <div className="flex flex-col items-end mb-3">
      {discount_price ? (
        <>
          <span className="text-gray-500 line-through text-sm">{formatPrice(price)}</span>
          <span className="text-lg font-bold text-blue-600">{formatPrice(discount_price)}</span>
        </>
      ) : (
        <span className="text-lg font-bold text-blue-600">{formatPrice(price)}</span>
      )}
    </div>
  );
};

export default ProductPrice;

import "./ProductPrice.css";
