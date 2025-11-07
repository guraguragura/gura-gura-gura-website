
import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductReviews } from '@/hooks/useProductReviews';
import ReviewSubmissionForm from './ReviewSubmissionForm';

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, averageRating, totalReviews }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { reviews, summary, loading, error, refetch } = useProductReviews(productId);

  const filterReviews = () => {
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
        return reviews.filter(review => review.verified_purchase);
      default:
        return reviews;
    }
  };

  const filteredReviews = filterReviews();


  // Calculate rating distribution from real data
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = summary.ratingDistribution[rating] || 0;
    const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
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
      {/* Review Submission Form */}
      {showReviewForm && (
        <ReviewSubmissionForm
          productId={productId}
          onSuccess={() => {
            setShowReviewForm(false);
            refetch();
          }}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold mb-2">{summary.averageRating.toFixed(1)}</div>
          <div className="flex mb-2">
            {renderStars(Math.round(summary.averageRating))}
          </div>
          <div className="text-sm text-gray-500">{summary.totalReviews} reviews</div>
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
          <Button 
            className="w-full mb-3"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Hide Form' : 'Write a Review'}
          </Button>
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
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {activeFilter ? 'No reviews match your selected filter.' : 'No reviews yet. Be the first to review!'}
            </p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between mb-2">
                <div className="font-semibold">{review.user_name || 'Anonymous'}</div>
                <div className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
                {review.verified_purchase && (
                  <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-blue-500">
                    <ThumbsUp size={14} className="mr-1" />
                    Helpful ({review.helpful_count})
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
