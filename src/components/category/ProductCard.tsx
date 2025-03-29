
import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
          <div className="relative bg-gray-100 p-4 md:w-48 flex-shrink-0">
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
            
            <Button 
              className="w-full py-2 text-sm flex items-center justify-center bg-gray-500 hover:bg-gray-600"
              onClick={() => console.log(`Add to cart: ${id}`)}
            >
              Add To Cart <ShoppingCart className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (updated to match reference image)
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md rounded-xl border">
      <div className="relative bg-gray-100 p-4">
        {is_sale && discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-500 text-white px-4 py-1.5 font-medium rounded-l-full rounded-r-full">
            Sale {discountPercentage}%
          </Badge>
        )}
        <Link to={`/product/${id}`}>
          <div className="flex justify-center items-center h-48">
            <img 
              src={thumbnail} 
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Link>
      </div>
      
      <CardContent className="flex-grow p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-gray-700 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-gray-800">{rating.toFixed(1)}</span>
          <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
          <span className="text-gray-500">({reviews_count > 1000 ? `${(reviews_count/1000).toFixed(0)}k` : reviews_count})</span>
        </div>
        
        <Progress value={inventoryPercentage} className="h-2 mb-2 bg-gray-200 rounded-full overflow-hidden" />
        <div className="text-sm text-gray-700 mb-6">
          Stock: {soldItems}
        </div>
        
        <div className="flex items-baseline gap-3 mb-4">
          {discount_price ? (
            <>
              <span className="text-gray-400 line-through text-xl">{formatPrice(price)}</span>
              <span className="text-2xl font-bold text-black">{formatPrice(discount_price)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-black">{formatPrice(price)}</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-0 mt-auto">
        <Button 
          className="w-full rounded-none py-4 text-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black font-semibold border-t"
          onClick={() => console.log(`Add to cart: ${id}`)}
        >
          Add To Cart <ShoppingCart className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
