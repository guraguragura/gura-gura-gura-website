
import React from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

const RecentlyViewed = () => {
  const { formatPrice, isLoading: currencyLoading } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();

  // Only show first 6 items
  const displayProducts = recentlyViewed.slice(0, 6);

  // Don't render section if no recently viewed items
  if (displayProducts.length === 0) {
    return null;
  }
  
  const handleWishlistToggle = (product: typeof displayProducts[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">
            <span className="font-bold">Recently</span> <span className="font-light">Viewed</span>
          </h2>
          <div className="flex items-center gap-4">
            <Link to="/history" className="text-gray-600 hover:text-gray-900">
              View History
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Previous</span>
                <svg 
                  width="15" 
                  height="15" 
                  viewBox="0 0 15 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <span className="sr-only">Next</span>
                <svg 
                  width="15" 
                  height="15" 
                  viewBox="0 0 15 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="flex flex-col h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full aspect-square object-cover" 
                />
                <div className="absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white bg-blue-500">
                  Recently Viewed
                </div>
                <button 
                  onClick={(e) => handleWishlistToggle(product, e)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100"
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                </button>
              </div>
              
              <div className="flex flex-col flex-1 p-3">
                {product.category && (
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                )}
                <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  {currencyLoading ? (
                    <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                  ) : (
                    <span className="font-bold">{formatPrice(product.price)}</span>
                  )}
                </div>
                
                <div className="mt-auto flex justify-center">
                  <AddToCartButton 
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      thumbnail: product.thumbnail
                    }}
                    className="h-8 w-8"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
