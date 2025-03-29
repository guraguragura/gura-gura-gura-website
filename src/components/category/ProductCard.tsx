
import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AddToCartButton from "@/components/product/AddToCartButton";
import "./ProductCard.css"; // Import custom CSS

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
  };
  viewMode: "grid" | "list";
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductProps> = ({ product, viewMode, formatPrice }) => {
  const { id, title, price, thumbnail, rating, reviews_count, discount_price, is_sale, description } = product;
  
  const totalInventory = 35;
  const soldItems = 18;
  const inventoryPercentage = (soldItems / totalInventory) * 100;
  
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
          </div>
          
          <div className="flex-grow p-4">
            <Link to={`/product/${id}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-500 transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold text-blue-600">{rating.toFixed(1)}</span>
              <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
              <span className="text-sm text-gray-500">({reviews_count > 1000 ? `${(reviews_count/1000).toFixed(0)}k` : reviews_count})</span>
            </div>
            
            <Progress value={inventoryPercentage} className="h-1.5 mb-1" />
            <div className="text-xs text-gray-600 mb-3">
              Sold: {soldItems}/{totalInventory}
            </div>
          </div>
          
          <div className="p-4 flex flex-col justify-between md:w-48 flex-shrink-0 border-t md:border-t-0 md:border-l">
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
            
            <AddToCartButton 
              product={{
                id: id,
                title: title,
                price: price,
                discount_price: discount_price,
                thumbnail: thumbnail
              }}
              className="w-full py-2 text-sm flex items-center justify-center"
            />
          </div>
        </div>
      </Card>
    );
  }

  // Grid view with hybrid approach
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
      </div>
      
      <CardContent className="product-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-title">
            {title}
          </h3>
        </Link>
        
        <div className="rating-container">
          <span className="rating-value">{rating.toFixed(1)}</span>
          <Star className="rating-star" />
          <span className="reviews-count">({reviews_count > 1000 ? `${(reviews_count/1000).toFixed(1)}k` : reviews_count} reviews)</span>
        </div>
        
        <Progress value={inventoryPercentage} className="inventory-progress" />
        <div className="inventory-text">
          {soldItems} items sold
        </div>
        
        <div className="price-container">
          {discount_price ? (
            <>
              <span className="original-price">{formatPrice(price)}</span>
              <span className="discount-price">{formatPrice(discount_price)}</span>
            </>
          ) : (
            <span className="discount-price">{formatPrice(price)}</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-0 mt-auto">
        <AddToCartButton 
          product={{
            id: id,
            title: title,
            price: price,
            discount_price: discount_price,
            thumbnail: thumbnail
          }}
          className="add-to-cart-button"
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
