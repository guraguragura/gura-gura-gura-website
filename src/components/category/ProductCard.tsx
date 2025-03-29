
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
  const { id, title, price, thumbnail, rating, reviews_count, discount_price, is_sale } = product;
  
  // Mock inventory data - in a real app, this would come from the backend
  const totalInventory = 35;
  const soldItems = 18;
  const inventoryPercentage = (soldItems / totalInventory) * 100;
  
  // Discount percentage calculation
  const discountPercentage = discount_price && price 
    ? Math.round(((price - discount_price) / price) * 100) 
    : 0;

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="relative bg-gray-100 p-4">
        {is_sale && discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 font-medium rounded-full">
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
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-blue-600">{rating.toFixed(1)}</span>
          <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
          <span className="text-gray-500">({reviews_count > 1000 ? `${(reviews_count/1000).toFixed(0)}k` : reviews_count})</span>
        </div>
        
        <Progress value={inventoryPercentage} className="h-2 mb-1" />
        <div className="text-sm text-gray-600 mb-4">
          Sold: {soldItems}/{totalInventory}
        </div>
        
        <div className="flex items-baseline gap-2">
          {discount_price ? (
            <>
              <span className="text-gray-500 line-through text-lg">{formatPrice(price)}</span>
              <span className="text-2xl font-bold">{formatPrice(discount_price)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
          )}
          <span className="text-gray-500 text-sm">/Qty</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-0">
        <Button 
          className="w-full rounded-none py-4 text-lg flex items-center justify-center"
          onClick={() => console.log(`Add to cart: ${id}`)}
        >
          Add To Cart <ShoppingCart className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
