import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProductReviews, ProductReview } from '@/hooks/useProductReviews';
import { useAuth } from '@/contexts/AuthContext';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-dom';

interface ProductReviewsProps {
  productId: string;
  productTitle: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productTitle }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const { reviews, summary, loading, error, submitReview } = useProductReviews(productId);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filterReviews = (reviews: ProductReview[]): ProductReview[] => {
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

  const filteredReviews = filterReviews(reviews);

  const handleWriteReview = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setReviewFormOpen(true);
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: summary.ratingDistribution[rating] || 0,
    percentage: summary.totalReviews > 0 
      ? ((summary.ratingDistribution[rating] || 0) / summary.totalReviews) * 100 
      : 0
  }));

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-muted-foreground">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Reviews Overview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Rating Summary */}
          <div className="md:col-span-1">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{summary.averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(summary.averageRating))}
              </div>
              <div className="text-sm text-gray-600">{summary.totalReviews} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-12">{rating} star</span>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm w-12 text-right">{Math.round(percentage)}%</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" onClick={handleWriteReview}>
              Write a Review
            </Button>
          </div>

          {/* Reviews List */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold">{review.user_name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        {review.verified_purchase && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful_count})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Dialog */}
      <ReviewForm
        open={reviewFormOpen}
        onOpenChange={setReviewFormOpen}
        onSubmit={submitReview}
        productTitle={productTitle}
      />
    </div>
  );
};

export default ProductReviews;
