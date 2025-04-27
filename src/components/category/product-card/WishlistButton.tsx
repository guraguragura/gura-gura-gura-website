import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import "./WishlistButton.css";

interface WishlistButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    discount_price?: number;
  };
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button 
      onClick={toggleWishlist}
      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
    >
      <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
    </button>
  );
};

export default WishlistButton;
