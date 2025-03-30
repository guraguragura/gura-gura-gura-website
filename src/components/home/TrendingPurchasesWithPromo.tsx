
import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

const trendingProducts = [
  {
    id: 1,
    name: "Wireless Earbuds Pro - White",
    price: 79.99,
    oldPrice: 119.99,
    image: "https://images.unsplash.com/photo-1606741965429-02919c0a010c",
    badge: "Hot",
    category: "Audio"
  },
  {
    id: 2,
    name: "Smart Watch Ultra - Titanium",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    badge: "New",
    category: "Watches" 
  },
  {
    id: 3,
    name: "Premium Noise-Cancelling Headphones",
    price: 199.99,
    oldPrice: 299.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    badge: null,
    category: "Audio"
  },
  {
    id: 4,
    name: "Ultra-Slim Laptop 15\" - Silver",
    price: 899.99,
    oldPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    badge: "Trending",
    category: "Laptops"
  },
  {
    id: 5,
    name: "Smart Home Speaker Mini",
    price: 49.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1589491106922-a8e488665d5c",
    badge: "Sale",
    category: "Smart Home"
  },
  {
    id: 6,
    name: "Professional Camera Lens Kit",
    price: 349.99,
    oldPrice: 499.99,
    image: "https://images.unsplash.com/photo-1617005082133-45a4fd451e91",
    badge: null,
    category: "Photography"
  },
  {
    id: 7,
    name: "Gaming Console Elite - Black",
    price: 449.99,
    oldPrice: 499.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
    badge: "Hot Deal",
    category: "Gaming"
  },
  {
    id: 8,
    name: "Portable Power Bank 20000mAh",
    price: 59.99,
    oldPrice: 89.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
    badge: null,
    category: "Accessories"
  }
];

const TrendingPurchasesWithPromo = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">
            Trending <span className="font-normal">Purchases</span>
          </h2>
          <div className="flex items-center gap-2">
            <Link to="/shop" className="text-gray-600 hover:text-gray-900 text-sm">
              View All Products
            </Link>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="rounded-full w-6 h-6">
                <span className="sr-only">Previous</span>
                <svg 
                  width="15" 
                  height="15" 
                  viewBox="0 0 15 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-6 h-6">
                <span className="sr-only">Next</span>
                <svg 
                  width="15" 
                  height="15" 
                  viewBox="0 0 15 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
          {/* Promotional Banner - 1 column, now on the left */}
          <div className="lg:col-span-1 rounded-lg overflow-hidden relative">
            <div className="bg-purple-900 h-full w-full rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-24 h-24 bg-purple-600 rounded-full opacity-30 -top-10 -right-10"></div>
                <div className="absolute w-32 h-32 bg-purple-600 rounded-full opacity-30 -bottom-20 -left-20"></div>
              </div>
              
              <div className="relative h-full p-3 flex flex-col justify-between">
                <div>
                  <div className="bg-amber-400 text-amber-800 text-[10px] font-bold rounded-full px-1.5 py-0.5 inline-block mb-1">30% off</div>
                  <h3 className="text-white text-xs font-bold mb-0.5 leading-tight">Wireless Earbuds Pro</h3>
                  <div className="text-purple-200 text-[10px] mb-0.5">FROM</div>
                  <div className="text-white text-sm font-bold mb-1">$79.99</div>
                </div>
                
                <div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-0.5 flex items-center gap-1 text-[10px] h-5">
                    Shop Now
                    <svg 
                      width="15" 
                      height="15" 
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.5 w-2.5"
                    >
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </div>
                
                <div className="absolute bottom-0 right-0 w-20 h-20">
                  <img 
                    src="https://images.unsplash.com/photo-1606741965429-02919c0a010c" 
                    alt="Wireless Earbuds Pro" 
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Section - 4 columns, now on the right */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="border rounded-lg overflow-hidden flex flex-col h-52">
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
                        product.badge === 'Hot' ? 'bg-pink-500' :
                        product.badge === 'Trending' ? 'bg-purple-500' :
                        product.badge === 'Hot Deal' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                      {product.badge}
                    </div>
                  )}
                  <button className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100">
                    <Heart className="h-2.5 w-2.5 text-gray-700" />
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
                  
                  <AddToCartButton 
                    product={{
                      id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      discount_price: product.oldPrice > product.price ? product.price : undefined,
                      thumbnail: product.image
                    }}
                    className="w-full text-[10px] py-0.5 h-6"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingPurchasesWithPromo;
