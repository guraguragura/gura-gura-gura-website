
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

const newArrivals = [
  {
    id: 1,
    name: "iPhone 14 Pro - Blue & Pink",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    badge: "New",
    category: "Smartphones"
  },
  {
    id: 2,
    name: "Galaxy Watch 5 - Black",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    badge: "25%OFF",
    category: "Watches" 
  },
  {
    id: 3,
    name: "iPhone 14 Pro - Graphite",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    badge: "25%OFF",
    category: "Smartphones"
  },
  {
    id: 4,
    name: "AirPods Pro - Lavender",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "25%OFF",
    category: "Audio"
  },
  {
    id: 5,
    name: "Xiaomi 13 Pro - Black",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1596079890744-c1a0462d0975", 
    badge: "Best Seller",
    category: "Smartphones"
  },
  {
    id: 6,
    name: "Samsung Galaxy S23 - Black",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1563514227147-6d2320bfbcca",
    badge: "New",
    category: "Smartphones"
  }
];

const FeaturedProducts = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">
            <span className="font-bold">New</span> Arrivals
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {newArrivals.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full aspect-square object-cover" 
                />
                {product.badge && (
                  <div className={`absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white
                    ${product.badge.includes('OFF') ? 'bg-red-500' : 
                      product.badge === 'New' ? 'bg-blue-500' : 
                      product.badge === 'Best Seller' ? 'bg-black' : 'bg-blue-500'}`}>
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100">
                  <Heart className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              
              <div className="p-3">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <h3 className="font-medium text-sm mb-2 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {isLoading ? (
                    <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                  ) : (
                    <>
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-sm line-through">{formatPrice(product.oldPrice)}</span>
                    </>
                  )}
                </div>
                
                <AddToCartButton 
                  product={{
                    id: product.id.toString(),
                    title: product.name,
                    price: product.price,
                    discount_price: product.oldPrice ? product.price : undefined,
                    thumbnail: product.image
                  }}
                  className="w-full flex items-center justify-center gap-2 size-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
