
import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const { id, title, description, price, thumbnail, rating, reviews_count, discount_price, is_sale, is_new } = product;
  
  // Generate star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute top-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className={`bg-white rounded-md shadow-sm overflow-hidden transition-all hover:shadow-md ${
      viewMode === "list" ? "flex" : ""
    }`}>
      <div className={`relative ${viewMode === "list" ? "w-1/3" : ""}`}>
        <Link to={`/product/${id}`}>
          <img 
            src={thumbnail} 
            alt={title} 
            className={`w-full ${viewMode === "grid" ? "h-48" : "h-full"} object-contain p-4`}
          />
        </Link>
        
        {is_new && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        {is_sale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      
      <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
        <div className="flex items-center mb-1">
          <div className="flex">{renderStars()}</div>
          <span className="text-xs text-gray-500 ml-1">({reviews_count})</span>
        </div>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-sm sm:text-base mb-1 hover:text-blue-500 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        {viewMode === "list" && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div>
            {discount_price ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-red-500">{formatPrice(discount_price)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(price)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="ml-2 whitespace-nowrap"
            onClick={() => console.log(`Add to cart: ${id}`)}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
