
import React from "react";
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviews_count: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, reviews_count }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-base font-bold text-blue-600">{rating.toFixed(1)}</span>
      <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
      <span className="text-sm text-gray-500">
        ({reviews_count > 1000 ? `${(reviews_count/1000).toFixed(0)}k` : reviews_count})
      </span>
    </div>
  );
};

export default ProductRating;
