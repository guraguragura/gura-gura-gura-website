import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
  title: z.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  comment: z.string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be less than 1000 characters")
});

interface ReviewSubmissionFormProps {
  productId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({ 
  productId, 
  onSuccess,
  onCancel 
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    try {
      reviewSchema.parse({ rating, title, comment });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please sign in to submit a review"
        });
        setIsSubmitting(false);
        return;
      }

      // Submit review
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating: rating,
          title: title.trim(),
          comment: comment.trim(),
          verified_purchase: false // Can be updated based on order history
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your feedback"
      });

      // Reset form
      setRating(0);
      setTitle('');
      setComment('');
      setErrors({});
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Unable to submit your review. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-background border rounded-lg">
      <h3 className="text-xl font-semibold">Write a Review</h3>

      {/* Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating">Your Rating *</Label>
        <div className="flex items-center gap-4">
          {renderStarRating()}
          {rating > 0 && (
            <span className="text-sm text-muted-foreground">
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Review Title *</Label>
        <Input
          id="title"
          type="text"
          placeholder="Sum up your experience in a few words"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          disabled={isSubmitting}
          className={errors.title ? "border-destructive" : ""}
        />
        <div className="flex justify-between items-center">
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title}</p>
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            {title.length}/100
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <Label htmlFor="comment">Your Review *</Label>
        <Textarea
          id="comment"
          placeholder="Share your thoughts about this product. What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={6}
          disabled={isSubmitting}
          className={errors.comment ? "border-destructive" : ""}
        />
        <div className="flex justify-between items-center">
          {errors.comment && (
            <p className="text-sm text-destructive">{errors.comment}</p>
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            {comment.length}/1000
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
        {onCancel && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReviewSubmissionForm;
