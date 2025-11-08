
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useWishlist } from "@/contexts/WishlistContext";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  isLoading: boolean;
}

const ProductCard = ({ product, formatPrice, isLoading }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productId = product.id.toString();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        title: product.name,
        price: product.price,
        discount_price: product.oldPrice > product.price ? product.price : undefined,
        thumbnail: product.image
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 border relative overflow-hidden">
        {product.badge && (
          <div className={`absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white 
            ${product.badge.toLowerCase().includes('sale') ? 'bg-blue-500' : 
              product.badge.toLowerCase().includes('new') ? 'bg-blue-500' : 
              'bg-black'}`}>
            {product.badge}
          </div>
        )}
        <div className="p-4 flex h-full flex-col">
          <div className="aspect-square overflow-hidden rounded-md mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-0 flex flex-col flex-1">
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-10">{product.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                {isLoading ? (
                  <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                ) : (
                  <>
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    <span className="text-gray-500 text-sm line-through">{formatPrice(product.oldPrice)}</span>
                  </>
                )}
              </div>
            </Link>
            <div className="mt-auto flex items-center justify-between gap-2">
              <AddToCartButton 
                product={{
                  id: product.id.toString(),
                  title: product.name,
                  price: product.price,
                  discount_price: product.oldPrice > product.price ? product.price : undefined,
                  thumbnail: product.image
                }}
                className="flex items-center gap-1 px-3 h-9 w-full"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9 flex-shrink-0"
                onClick={handleWishlistToggle}
              >
                <Heart 
                  className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
