import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePersonalizedRecommendations } from '@/hooks/usePersonalizedRecommendations';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface PersonalizedRecommendationsProps {
  title?: string;
  limit?: number;
  excludeProductIds?: string[];
  currentProductId?: string;
  className?: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  title = "You May Also Like",
  limit = 8,
  excludeProductIds = [],
  currentProductId,
  className = "",
}) => {
  const { recommendations, loading } = usePersonalizedRecommendations({
    limit,
    excludeProductIds,
    currentProductId,
  });
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleWishlistToggle = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const price = product.metadata?.discount_price || product.metadata?.price || 0;
    
    addItem({
      id: product.id,
      title: product.title,
      price: price,
      discount_price: product.metadata?.discount_price,
      quantity: 1,
      thumbnail: product.thumbnail || '',
    });
    toast.success('Added to cart');
  };

  const formatPrice = (amount: number, currency: string = 'RWF') => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <section className={`py-8 ${className}`}>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <Skeleton className="w-full aspect-square mb-3 rounded-lg" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">
          <span className="font-bold">{title.split(' ')[0]}</span>{' '}
          <span className="font-light">{title.split(' ').slice(1).join(' ')}</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => {
          const price = product.metadata?.price || 0;
          const discountPrice = product.metadata?.discount_price;
          const displayPrice = discountPrice || price;
          const inWishlist = isInWishlist(product.id);

          return (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="relative mb-3 overflow-hidden rounded-lg bg-muted aspect-square">
                    <img
                      src={product.thumbnail || '/placeholder.svg'}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          inWishlist ? 'fill-red-500 text-red-500' : 'text-foreground'
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(displayPrice)}
                      </p>
                      {discountPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(price)}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleAddToCart(e, product)}
                      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;
