
import React, { useState } from 'react';
import { Star, Heart, Share, Truck, ArrowLeftRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/hooks/useCurrency';

interface ProductInfoProps {
  product: {
    title: string;
    subtitle?: string;
    price: number;
    discount_price?: number;
    rating: number;
    reviews_count: number;
    description: string;
    sku?: string;
    is_new?: boolean;
    is_sale?: boolean;
    variants?: any[];
    in_stock: boolean;
  };
  onAddToCart: (quantity: number) => void;
  onAddToWishlist: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div>
      {/* Title and Badges */}
      <div className="mb-4">
        {product.is_new && (
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">
            NEW
          </span>
        )}
        {product.is_sale && (
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </span>
        )}
        <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
        {product.subtitle && (
          <p className="text-gray-600 mt-1">{product.subtitle}</p>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={16} 
              className={star <= Math.round(product.rating) 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"} 
            />
          ))}
        </div>
        <span className="text-sm text-blue-500 hover:underline cursor-pointer">
          {product.reviews_count} reviews
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-sm text-gray-600">
          SKU: {product.sku || "N/A"}
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        {product.discount_price ? (
          <div className="flex items-center">
            <span className="text-3xl font-bold text-red-500">
              {formatPrice(product.discount_price)}
            </span>
            <span className="text-xl text-gray-500 line-through ml-3">
              {formatPrice(product.price)}
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-gray-600 mb-6">
        {product.description.split('.')[0]}.
      </p>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Available Colors:</h3>
          <div className="flex space-x-2">
            {product.variants.map((variant, idx) => (
              <div 
                key={idx}
                className="p-2 border rounded-md cursor-pointer hover:border-blue-500"
              >
                <img 
                  src={variant.thumbnail} 
                  alt={variant.color} 
                  className="h-12 w-12 object-contain"
                />
                <p className="text-xs text-center mt-1">{variant.color}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="text-gray-600"
          >
            <span className="text-lg">-</span>
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={incrementQuantity}
            className="text-gray-600"
          >
            <span className="text-lg">+</span>
          </Button>
        </div>
        <Button 
          className="flex-1 bg-blue-500 hover:bg-blue-600"
          onClick={() => onAddToCart(quantity)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2 h-4 w-4" 
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Add to Cart
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onAddToWishlist}
          className="text-gray-600"
        >
          <Heart size={20} />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="text-gray-600"
        >
          <Share size={20} />
        </Button>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 p-4 rounded-md space-y-3 mb-6">
        <div className="flex items-center">
          <Truck className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Free shipping</p>
            <p className="text-xs text-gray-500">For orders over $50</p>
          </div>
        </div>
        <div className="flex items-center">
          <ArrowLeftRight className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Easy returns</p>
            <p className="text-xs text-gray-500">30 day return policy</p>
          </div>
        </div>
        <div className="flex items-center">
          <Package className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium">In stock</p>
            <p className="text-xs text-gray-500">Ships within 1-2 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
