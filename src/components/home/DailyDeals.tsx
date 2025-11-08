/**
 * DailyDeals Component
 * 
 * IMPORTANT: This component fetches products from the database.
 * DO NOT add hardcoded product data here. All products must come from Supabase.
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const DailyDeals = () => {
  const { formatPrice, isLoading: currencyLoading } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Fetch products from database with sale tag or on-sale flag
  const { products, isLoading: productsLoading, error } = useProducts({ 
    onSale: true, 
    limit: 8 
  });
  
  const isLoading = currencyLoading || productsLoading;
  
  const handleWishlistToggle = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        addToWishlist({
          id: product.id,
          title: product.title,
          price: product.price,
          discount_price: product.discount_price,
          thumbnail: product.thumbnail
        });
      }
    }
  };
  
  // Calculate discount percentage
  const getDiscountPercentage = (price: number, discountPrice?: number) => {
    if (!discountPrice || discountPrice >= price) return 0;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sparkles className="text-yellow-500 mr-2 h-6 w-6" />
            <h2 className="text-2xl font-bold">Daily <span className="font-normal">Deals</span></h2>
          </div>
          <Link to="/deals" className="text-blue-600 hover:underline font-medium">
            View All Deals
          </Link>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array(8).fill(null).map((_, index) => (
              <Card key={index} className="h-full overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load deals at this time. Please try again later.</p>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No deals available at the moment. Check back soon!</p>
          </div>
        )}
        
        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const discountPercentage = getDiscountPercentage(product.price, product.discount_price);
              
              return (
                <div key={product.id}>
                  <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.thumbnail} 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      {discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discountPercentage}%
                        </div>
                      )}
                      <button 
                        onClick={(e) => handleWishlistToggle(product.id, e)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-lg">
                          {formatPrice(product.discount_price || product.price)}
                        </span>
                        {product.discount_price && (
                          <span className="text-gray-500 text-sm line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <AddToCartButton 
                        product={{
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          discount_price: product.discount_price,
                          thumbnail: product.thumbnail
                        }}
                        className="h-9 w-9"
                      />
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyDeals;
