
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProducts = () => {
  const { formatPrice, isLoading: currencyLoading } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products, isLoading: productsLoading, error } = useProducts({ 
    limit: 6,
    featured: true // Get featured products
  });
  
  const isLoading = currencyLoading || productsLoading;

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = product.id.toString();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        title: product.name || product.title,
        price: product.price,
        discount_price: product.discount_price,
        thumbnail: product.image || product.thumbnail
      });
    }
  };

  

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">
            <span className="font-bold">New</span> <span className="font-light">Arrivals</span>
          </h2>
          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">
              View All Products
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
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, index) => (
              <div key={`loading-${index}`} className="border rounded-lg overflow-hidden">
                <Skeleton className="w-full aspect-square" />
                <div className="p-3">
                  <Skeleton className="w-16 h-3 mb-1" />
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-20 h-4 mb-3" />
                  <Skeleton className="w-full h-8" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full p-8 text-center text-gray-500">
              <p>Failed to load products. {error}</p>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.thumbnail || "/placeholder.svg"} 
                    alt={product.title}
                    className="w-full aspect-square object-cover" 
                  />
                  {product.is_new && (
                    <div className="absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white bg-blue-500">
                      New
                    </div>
                  )}
                  {product.is_sale && (
                    <div className="absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white bg-red-500">
                      Sale
                    </div>
                  )}
                  <button 
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100"
                  >
                    <Heart 
                      className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                    />
                  </button>
                </div>
                
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {product.raw_metadata?.product_type || "Product"}
                  </div>
                  <h3 className="font-medium text-sm mb-2 line-clamp-1">{product.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {currencyLoading ? (
                      <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                    ) : (
                      <>
                        <span className="font-bold">{formatPrice(product.discount_price || product.price)}</span>
                        {product.discount_price && (
                          <span className="text-gray-500 text-sm line-through">{formatPrice(product.price)}</span>
                        )}
                      </>
                    )}
                  </div>
                  
                  <AddToCartButton 
                    product={{
                      id: product.id.toString(),
                      title: product.title,
                      price: product.price,
                      discount_price: product.discount_price,
                      thumbnail: product.thumbnail
                    }}
                    className="w-full flex items-center justify-center gap-2 size-sm"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center text-gray-500 py-12">
              <p>No new arrivals found. Add products and mark them as featured in your admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
