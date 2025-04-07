
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/hooks/useCurrency';
import AddToCartButton from "@/components/product/AddToCartButton";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover" 
                />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              <CardContent className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium line-clamp-1 hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                
                {item.category && (
                  <div className="text-xs text-gray-500 mt-1 mb-2">{item.category}</div>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  {isLoading ? (
                    <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                  ) : (
                    <>
                      {item.discount_price ? (
                        <>
                          <span className="font-bold">{formatPrice(item.discount_price)}</span>
                          <span className="text-gray-500 text-sm line-through">{formatPrice(item.price)}</span>
                        </>
                      ) : (
                        <span className="font-bold">{formatPrice(item.price)}</span>
                      )}
                    </>
                  )}
                </div>
                
                <AddToCartButton 
                  product={{
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    discount_price: item.discount_price,
                    thumbnail: item.thumbnail
                  }}
                  className="w-full"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
