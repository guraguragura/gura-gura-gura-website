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
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
}

const CategoryCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        } else {
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

  const fallbackCategories = [
    {
      id: "pcat_01",
      name: "Women's Collection",
      handle: "women"
    },
    {
      id: "pcat_02",
      name: "Men's Collection",
      handle: "men"
    },
    {
      id: "pcat_03",
      name: "Electronics",
      handle: "electronics"
    },
    {
      id: "pcat_04",
      name: "10K Shop",
      handle: "10k-shop"
    },
    {
      id: "pcat_05",
      name: "Home & Art",
      handle: "home-art"
    }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  
  const getCategoryImage = (handle: string) => {
    const imageMap: Record<string, string> = {
      "women": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "men": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
      "10k-shop": "https://images.unsplash.com/photo-1607082349566-187342175e2f",
      "home-art": "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png",
      "appliances-kitchen": "https://images.unsplash.com/photo-1574269906882-7b08f4f6c37c",
      "phones-accessories": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "sports-outdoors": "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      "health-beauty": "https://images.unsplash.com/photo-1607006677169-a62beb975922",
      "kids": "/lovable-uploads/ee7d75cc-e5d9-43fb-9381-a969386ddab7.png",
      "car-accessories": "/lovable-uploads/ea338bf4-ab81-449c-b252-6f5c79c8bfad.png"
    };
    
    return imageMap[handle] || "https://images.unsplash.com/photo-1607082349566-187342175e2f";
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending <span className="font-normal">Categories</span></h2>
          <Link to="/collections" className="text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="h-32 w-32 bg-slate-200 rounded"></div>
              <div className="h-32 w-32 bg-slate-200 rounded"></div>
              <div className="h-32 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : (
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {displayCategories.map((category) => (
                <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/4">
                  <Link to={`/categories/${category.handle}`} className="block group">
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <img
                        src={getCategoryImage(category.handle)}
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
        )}
      </div>
    </section>
  );
};

export default CategoryCarousel;
