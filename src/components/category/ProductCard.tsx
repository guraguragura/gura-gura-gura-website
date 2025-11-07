
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WishlistButton from "./product-card/WishlistButton";
import ProductRating from "./product-card/ProductRating";
import ProductInventory from "./product-card/ProductInventory";
import ProductPrice from "./product-card/ProductPrice";
import ProductActions from "./product-card/ProductActions";
import "./ProductCard.css";

interface ProductProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    rating: number;
    reviews_count: number;
    discount_price?: number;
    is_sale?: boolean;
    is_new?: boolean;
    tags?: string[];
  };
  viewMode: "grid" | "list";
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductProps> = ({ product, viewMode, formatPrice }) => {
  const { id, title, price, thumbnail, rating, reviews_count, discount_price, is_sale, description } = product;
  
  const discountPercentage = discount_price && price 
    ? Math.round(((price - discount_price) / price) * 100) 
    : 0;

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden mb-4 transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="relative bg-white p-4 md:w-48 flex-shrink-0">
            {is_sale && discountPercentage > 0 && (
              <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 font-medium rounded-full">
                Sale {discountPercentage}%
              </Badge>
            )}
            <Link to={`/product/${id}`}>
              <div className="flex justify-center items-center h-36">
                <img 
                  src={thumbnail} 
                  alt={title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>
            <WishlistButton product={product} />
          </div>
          
          <div className="flex-grow p-4">
            <Link to={`/product/${id}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-500 transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
            
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <ProductRating rating={rating} reviews_count={reviews_count} />
          </div>
          
          <div className="p-4 flex flex-col justify-between md:w-48 flex-shrink-0 border-t md:border-t-0 md:border-l">
            <ProductPrice price={price} discount_price={discount_price} formatPrice={formatPrice} />
            <ProductActions product={product} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="product-card-grid overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="product-image-container relative">
        {is_sale && discountPercentage > 0 && (
          <Badge className="sale-badge">
            Sale {discountPercentage}%
          </Badge>
        )}
        <Link to={`/product/${id}`}>
          <div className="product-image-wrapper">
            <img 
              src={thumbnail} 
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Link>
        <WishlistButton product={product} />
      </div>
      
      <CardContent className="product-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-title">
            {title}
          </h3>
        </Link>
        
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="rating-container">
          <ProductRating rating={rating} reviews_count={reviews_count} />
        </div>
        
        <ProductPrice price={price} discount_price={discount_price} formatPrice={formatPrice} />
      </CardContent>
      
      <CardFooter className="p-0 mt-auto">
        <div className="w-full p-2">
          <ProductActions product={product} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
