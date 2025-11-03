
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/hooks/useCurrency';
import ProductCard from "@/components/category/ProductCard";

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { formatPrice, isLoading } = useCurrency();

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
          {wishlist.map((item) => (
            <ProductCard 
              key={item.id}
              product={{
                id: item.id,
                title: item.title,
                description: item.category || "No description available",
                price: item.price,
                thumbnail: item.thumbnail,
                rating: 0,
                reviews_count: 0,
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
