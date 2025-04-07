
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/hooks/useCurrency';
import { useWishlist } from '@/contexts/WishlistContext';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  is_sale?: boolean;
  is_new?: boolean;
}

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const { formatPrice } = useCurrency();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Mock related products
  const mockProducts: Product[] = Array(4).fill(null).map((_, idx) => ({
    id: `related-${idx}`,
    title: "Similar Product " + (idx + 1),
    thumbnail: "/placeholder.svg",
    price: 14.99 + idx * 5,
    discount_price: idx % 2 === 0 ? 12.99 + idx * 4 : undefined,
    rating: 4 + (idx % 2) * 0.5,
    reviews_count: 50 + idx * 20,
    is_sale: idx % 2 === 0,
    is_new: idx % 3 === 0
  }));

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };
  
  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        discount_price: product.discount_price,
        thumbnail: product.thumbnail
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="relative mb-4">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-40 object-contain"
                />
              </Link>
              
              {product.is_new && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  NEW
                </div>
              )}
              
              {product.is_sale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </div>
              )}
              
              <button 
                onClick={(e) => handleWishlistToggle(product, e)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Heart 
                  className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                />
              </button>
            </div>
            
            <div className="flex items-center mb-1">
              {renderStars(product.rating)}
              <span className="text-xs text-gray-500 ml-1">({product.reviews_count})</span>
            </div>
            
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-sm mb-2 hover:text-blue-500 transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            
            <div className="flex justify-between items-center mt-2">
              <div>
                {product.discount_price ? (
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-red-500">{formatPrice(product.discount_price)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.price)}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                )}
              </div>
            </div>

            <AddToCartButton 
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                discount_price: product.discount_price,
                thumbnail: product.thumbnail
              }}
              className="w-full mt-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
