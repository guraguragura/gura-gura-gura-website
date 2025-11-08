import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useWishlist } from "@/contexts/WishlistContext";

interface FeaturedProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice: number;
    salePrice?: number;
    image: string;
    badge: string | null;
    category: string;
    badges?: string[];
    rating?: number;
  }
}

const FeaturedProductCard = ({ product }: FeaturedProductCardProps) => {
  const { formatPrice, isLoading } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const productId = product.id.toString();
  const inWishlist = isInWishlist(productId);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        title: product.name,
        price: product.price,
        discount_price: product.oldPrice > product.price ? product.price : undefined,
        thumbnail: product.image,
        category: product.category
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="border rounded-lg overflow-hidden flex flex-col h-52">
      <div className="relative h-28">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover" 
        />
        {product.badge && (
          <div className={`absolute top-1 left-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white
            ${product.badge === 'Best seller' ? 'bg-black' : 
              product.badge === 'New' ? 'bg-blue-500' : 
              product.badge === 'Sale' ? 'bg-red-500' : 
              product.badge === 'Hot Deal' ? 'bg-orange-500' : 'bg-blue-500'}`}>
            {product.badge}
          </div>
        )}
        <button 
          onClick={toggleWishlist}
          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100"
        >
          <Heart className={`h-2.5 w-2.5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>
      </div>
      
      <div className="p-2 flex flex-col flex-grow">
        <div className="text-[10px] text-gray-500 mb-0.5">{product.category}</div>
        <h3 className="font-medium text-[11px] mb-1 line-clamp-1 flex-grow">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-1">
          {isLoading ? (
            <div className="animate-pulse h-3 bg-gray-200 rounded w-10"></div>
          ) : (
            <>
              <span className="text-xs font-bold">{formatPrice(product.price)}</span>
              <span className="text-gray-500 text-[10px] line-through">{formatPrice(product.oldPrice)}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-1">
          <AddToCartButton 
            product={{
              id: product.id.toString(),
              title: product.name,
              price: product.price,
              discount_price: product.oldPrice > product.price ? product.price : undefined,
              thumbnail: product.image
            }}
          />
        </div>
      </div>
    </Card>
    </Link>
  );
};

export default FeaturedProductCard;
