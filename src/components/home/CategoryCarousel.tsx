
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Use the same categories from the Categories component for consistency
const categories = [
  {
    id: 1,
    name: "Women's Collection",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    link: "/collections/women"
  },
  {
    id: 2,
    name: "Men's Collection",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "/collections/men"
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    link: "/collections/accessories"
  },
  {
    id: 4,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
    link: "/collections/electronics"
  },
  {
    id: 5,
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
    link: "/collections/home-decor"
  }
];

const CategoryCarousel = () => {
  const [api, setApi] = useState<any>(null);
  
  // Set up auto-scrolling to the right
  useEffect(() => {
    if (!api) return;
    
    // Scroll to the next slide every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Categories</h2>
          <Link to="/collections" className="text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/4">
                <Link to={category.link} className="block group">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white text-lg font-medium">{category.name}</h3>
                    </div>
                  </div>
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

export default CategoryCarousel;
