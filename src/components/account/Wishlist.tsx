
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/hooks/useCurrency';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from "@/components/category/ProductCard";

interface WishlistItemWithReviews {
  id: string;
  title: string;
  category?: string;
  price: number;
  thumbnail: string;
  discount_price?: number;
  rating: number;
  reviews_count: number;
}

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { formatPrice, isLoading } = useCurrency();
  const [productsWithReviews, setProductsWithReviews] = useState<WishlistItemWithReviews[]>([]);

  // Fetch actual review data for wishlist items
  useEffect(() => {
    const fetchReviewData = async () => {
      if (wishlist.length === 0) {
        setProductsWithReviews([]);
        return;
      }

      const productIds = wishlist.map(item => item.id);
      
      const { data: reviewData } = await supabase
        .from('product_reviews')
        .select('product_id, rating')
        .in('product_id', productIds);

      const reviewsByProduct = (reviewData || []).reduce((acc, review) => {
        if (!acc[review.product_id]) {
          acc[review.product_id] = { ratings: [], count: 0 };
        }
        acc[review.product_id].ratings.push(review.rating);
        acc[review.product_id].count++;
        return acc;
      }, {} as Record<string, { ratings: number[], count: number }>);

      const enrichedProducts = wishlist.map(item => {
        const reviewInfo = reviewsByProduct[item.id];
        const rating = reviewInfo 
          ? reviewInfo.ratings.reduce((sum, r) => sum + r, 0) / reviewInfo.ratings.length 
          : 0;
        const reviews_count = reviewInfo ? reviewInfo.count : 0;

        return {
          ...item,
          rating,
          reviews_count
        };
      });

      setProductsWithReviews(enrichedProducts);
    };

    fetchReviewData();
  }, [wishlist]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Wishlist</h2>
        {wishlist.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearWishlist}
            className="text-sm"
          >
            Clear Wishlist
          </Button>
        )}
      </div>
      
      {wishlist.length === 0 ? (
        <div className="border rounded-lg p-6 text-center py-12">
          <p className="text-gray-500">Your wishlist is empty.</p>
          <p className="text-gray-500 mt-1">Items added to your wishlist will appear here.</p>
          <Link to="/">
            <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsWithReviews.map((item) => (
            <ProductCard 
              key={item.id}
              product={{
                id: item.id,
                title: item.title,
                description: item.category || "No description available",
                price: item.price,
                thumbnail: item.thumbnail,
                rating: item.rating,
                reviews_count: item.reviews_count,
                discount_price: item.discount_price,
                is_sale: !!item.discount_price,
                is_new: false
              }}
              viewMode="grid"
              formatPrice={formatPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
