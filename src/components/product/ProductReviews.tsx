
import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  isVerified: boolean;
  helpfulCount: number;
  helpfulPercentage: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, averageRating, totalReviews }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Mock review data
  const mockReviews: Review[] = Array(6).fill(null).map((_, idx) => ({
    id: `review-${idx}`,
    author: `Customer ${idx + 1}`,
    date: new Date(Date.now() - (idx * 86400000)).toLocaleDateString(),
    rating: Math.max(3, Math.floor(Math.random() * 6)),
    title: ["Great product!", "Highly recommend", "Good value", "Excellent quality", "Works well", "Worth the money"][idx % 6],
    content: "This product exceeded my expectations. The build quality is excellent and it works exactly as described. I would definitely recommend this to anyone looking for a reliable product in this category.",
    isVerified: idx % 3 === 0,
    helpfulCount: Math.floor(Math.random() * 50),
    helpfulPercentage: Math.floor(Math.random() * 40) + 60
  }));

  const filterReviews = (reviews: Review[]): Review[] => {
    if (!activeFilter) return reviews;
    
    switch (activeFilter) {
      case "5star":
        return reviews.filter(review => review.rating === 5);
      case "4star":
        return reviews.filter(review => review.rating === 4);
      case "3star":
        return reviews.filter(review => review.rating === 3);
      case "2star":
        return reviews.filter(review => review.rating === 2);
      case "1star":
        return reviews.filter(review => review.rating === 1);
      case "verified":
        return reviews.filter(review => review.isVerified);
      default:
        return reviews;
    }
  };

  const filteredReviews = filterReviews(mockReviews);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = mockReviews.filter(review => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / mockReviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <div className="text-sm text-gray-500">{totalReviews} reviews</div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center">
              <div className="flex items-center w-24">
                {renderStars(rating)}
              </div>
              <div className="flex-1 h-2 mx-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-12 text-xs text-gray-500 text-right">
                {count}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center">
          <Button className="w-full mb-3">Write a Review</Button>
          <p className="text-center text-sm text-gray-500">
            Share your thoughts with other customers
          </p>
        </div>
      </div>

      {/* Review Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter(null)}
        >
          All Reviews
        </Button>
        {[5, 4, 3, 2, 1].map(rating => (
          <Button 
            key={rating}
            variant={activeFilter === `${rating}star` ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter(activeFilter === `${rating}star` ? null : `${rating}star`)}
          >
            {rating} Star
          </Button>
        ))}
        <Button 
          variant={activeFilter === "verified" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter(activeFilter === "verified" ? null : "verified")}
        >
          Verified Purchases
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews match your selected filter.</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between mb-2">
                <div className="font-semibold">{review.author}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                {review.isVerified && (
                  <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-600 mb-4">{review.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">{review.helpfulPercentage}% of people found this helpful</span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-blue-500">
                    <ThumbsUp size={14} className="mr-1" />
                    Helpful ({review.helpfulCount})
                  </button>
                  <button className="flex items-center hover:text-blue-500">
                    <ThumbsDown size={14} className="mr-1" />
                    Not helpful
                  </button>
                  <button className="hover:text-blue-500">Report</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredReviews.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="sm" className="mx-1">
            Previous
          </Button>
          <Button variant="default" size="sm" className="mx-1">
            1
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            2
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            3
          </Button>
          <span className="mx-1 flex items-center">...</span>
          <Button variant="outline" size="sm" className="mx-1">
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
