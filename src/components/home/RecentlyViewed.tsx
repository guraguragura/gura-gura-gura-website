
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";

const recentProducts = [
  {
    id: 1,
    name: "Smart Home Assistant",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d3",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Ultra HD 4K Monitor",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    category: "Computers"
  },
  {
    id: 3,
    name: "Wireless Gaming Mouse",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    category: "Gaming"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558050032-160f36233451",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Portable SSD Drive",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1563826904577-6b72c5d75e53",
    category: "Storage"
  },
  {
    id: 6,
    name: "Wireless Charger",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1603539444875-76e7684265f3",
    category: "Mobile"
  }
];

const RecentlyViewed = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
        
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {recentProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4">
                <Link to={`/product/${product.id}`}>
                  <Card className="h-full transition-all duration-300 hover:shadow-md">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                      {isLoading ? (
                        <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                      ) : (
                        <div className="font-semibold">{formatPrice(product.price)}</div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default RecentlyViewed;
