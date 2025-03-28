
import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "New",
    category: "Chargers"
  },
  {
    id: 2,
    name: "Galaxy Watch 5 - Black",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    badge: null,
    category: "Watches" 
  },
  {
    id: 3,
    name: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: null,
    category: "Chargers"
  },
  {
    id: 4,
    name: "iPhone 14 Pro - Graphite",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    badge: "Best seller",
    category: "Smartphones"
  }
];

const FeaturedProductsWithPromo = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">
            <span className="font-bold">Featured</span> Products
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Products Section - 4 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="border rounded-lg overflow-hidden flex flex-col">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square object-cover" 
                  />
                  {product.badge && (
                    <div className={`absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white
                      ${product.badge === 'Best seller' ? 'bg-black' : 
                        product.badge === 'New' ? 'bg-blue-500' : 'bg-blue-500'}`}>
                      {product.badge}
                    </div>
                  )}
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100">
                    <Heart className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 flex-grow">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {isLoading ? (
                      <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                    ) : (
                      <>
                        <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                        <span className="text-gray-500 text-sm line-through">{formatPrice(product.oldPrice)}</span>
                      </>
                    )}
                  </div>
                  
                  <Button className="w-full flex items-center justify-center gap-1">
                    Add To Cart
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Promotional Banner - 2 columns */}
          <div className="lg:col-span-2 rounded-lg overflow-hidden relative">
            <div className="bg-indigo-900 h-full w-full rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-48 h-48 bg-indigo-600 rounded-full opacity-30 -top-10 -right-10"></div>
                <div className="absolute w-72 h-72 bg-indigo-600 rounded-full opacity-30 -bottom-20 -left-20"></div>
              </div>
              
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div>
                  <div className="bg-amber-400 text-amber-800 text-xs font-bold rounded-full px-3 py-1 inline-block mb-4">20% off</div>
                  <h3 className="text-white text-2xl font-bold mb-2">iPhone Smart Phone - Red</h3>
                  <div className="text-indigo-200 mb-1">FROM</div>
                  <div className="text-white text-4xl font-bold mb-4">$890</div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 flex items-center gap-2">
                    Shop Now
                    <svg 
                      width="15" 
                      height="15" 
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </div>
                
                <div className="absolute bottom-0 right-0 w-48 h-64">
                  <img 
                    src="/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png" 
                    alt="iPhone Smart Phone" 
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsWithPromo;
