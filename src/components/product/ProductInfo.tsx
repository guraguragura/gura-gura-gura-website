
import React, { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrency } from "@/hooks/useCurrency";
import AddToCartButton from "./AddToCartButton";

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    price: number;
    discount_price?: number;
    rating: number;
    reviews_count: number;
    in_stock: boolean;
    sku?: string;
    features?: string[];
    is_sale?: boolean;
    is_new?: boolean;
    variants?: any[];
    thumbnail: string;
  };
  onAddToCart: (quantity: number) => void;
  onAddToWishlist: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onAddToWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Product Title and Ratings */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
      
      {product.subtitle && (
        <p className="text-gray-600 mb-4">{product.subtitle}</p>
      )}
      
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500">
          {product.rating} ({product.reviews_count} reviews)
        </span>
      </div>
      
      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center">
          {product.discount_price ? (
            <>
              <span className="text-2xl font-bold text-red-600 mr-2">
                {formatPrice(product.discount_price)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
          )}
        </div>
        
        {product.in_stock ? (
          <p className="text-green-600 mt-1 text-sm">In Stock</p>
        ) : (
          <p className="text-red-600 mt-1 text-sm">Out of Stock</p>
        )}
      </div>
      
      {/* Product Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {product.is_new && (
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
            New Arrival
          </span>
        )}
        {product.is_sale && (
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
            On Sale
          </span>
        )}
        {product.sku && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
            SKU: {product.sku}
          </span>
        )}
      </div>
      
      {/* Product Description */}
      <p className="text-gray-700 mb-6">{product.description}</p>
      
      {/* Product Variants if any */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Colors</h3>
          <div className="flex gap-2">
            {product.variants.map((variant, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500"
                title={variant.color}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: variant.color.toLowerCase() }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Quantity Selector */}
      <div className="flex items-center mb-6">
        <span className="mr-4 font-medium">Quantity:</span>
        <div className="flex border border-gray-300 rounded-md">
          <button
            type="button"
            className="px-3 py-2 border-r border-gray-300"
            onClick={decreaseQuantity}
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center border-none focus:ring-0"
          />
          <button
            type="button"
            className="px-3 py-2 border-l border-gray-300"
            onClick={increaseQuantity}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <AddToCartButton 
          product={product}
          quantity={quantity}
          className="flex-grow"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={onAddToWishlist}
          className="h-10 w-10"
        >
          <Heart size={20} />
        </Button>
      </div>
      
      {/* Key Features */}
      {product.features && product.features.length > 0 && (
        <div className="mt-auto">
          <Separator className="mb-4" />
          <h3 className="font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
