
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Taylor Farms Broccoli Florets Vegetables",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1583608205776-babe6e647bb2",
    badge: "Sale 50%"
  },
  {
    id: 2,
    name: "Taylor Farms Broccoli Florets Vegetables",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1583608205776-babe6e647bb2",
    badge: "New"
  },
  {
    id: 3,
    name: "Taylor Farms Broccoli Florets Vegetables",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1583608205776-babe6e647bb2",
    badge: "Best seller"
  },
  {
    id: 4,
    name: "Taylor Farms Broccoli Florets Vegetables",
    price: 14.99,
    oldPrice: 28.99,
    image: "https://images.unsplash.com/photo-1583608205776-babe6e647bb2",
    badge: "Best Seller"
  }
];

const TopSellingProducts = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Top Selling <span className="font-normal">Products</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Promotional Banner */}
          <div className="lg:col-span-1 bg-blue-100 rounded-lg overflow-hidden">
            <div className="h-full flex flex-col justify-between p-6 relative">
              <div className="text-center lg:text-left">
                <div className="text-lg font-medium mb-1">Polaroid Now+ Gen 2 - White</div>
                <h3 className="text-2xl font-bold mb-6">Fresh Vegetables</h3>
                <Button className="rounded-full flex items-center gap-2 bg-white text-black hover:bg-gray-100">
                  Shop Now
                </Button>
              </div>
              <div className="mt-4 flex justify-center">
                <img 
                  src="/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png" 
                  alt="Polaroid Camera" 
                  className="max-h-48 object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Product Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col h-full">
                <Card className="flex-1 border relative overflow-hidden">
                  {product.badge && (
                    <div className={`absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white 
                      ${product.badge.toLowerCase().includes('sale') ? 'bg-blue-500' : 
                        product.badge.toLowerCase().includes('new') ? 'bg-blue-500' : 
                        'bg-black'}`}>
                      {product.badge}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="aspect-square overflow-hidden rounded-md mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-0">
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
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
                      <div className="flex items-center justify-between">
                        <AddToCartButton 
                          product={{
                            id: product.id.toString(),
                            title: product.name,
                            price: product.price,
                            discount_price: product.oldPrice > product.price ? product.price : undefined,
                            thumbnail: product.image
                          }}
                          className="flex items-center gap-1 px-3 py-1 h-8 w-full mr-2"
                        />
                        <Button variant="outline" size="icon" className="rounded-full h-8 w-8 flex-shrink-0">
                          <Heart className="h-4 w-4" />
                          <span className="sr-only">Add to wishlist</span>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
