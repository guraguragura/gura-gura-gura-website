
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import CategoryItem from "./CategoryItem";
import PopularCategoriesSkeleton from "./PopularCategoriesSkeleton";
import { staticCategories, getCategoryStyle, getRandomColor } from "@/utils/categoryUtils";

interface Category {
  id: string;
  name: string;
  handle: string;
  is_active?: boolean;
}

interface PopularCategoriesProps {
  dbCategories?: Category[];
  isLoading?: boolean;
}

const PopularCategories: React.FC<PopularCategoriesProps> = ({ 
  dbCategories = [], 
  isLoading = false 
}) => {
  const [api, setApi] = React.useState<any>(null);
  
  React.useEffect(() => {
    if (!api) return;
    
    // Auto-scroll the carousel every 5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);
  
  // Process categories and ensure they have the correct images
  const displayCategories = dbCategories.length > 0 
    ? dbCategories.map(cat => {
        const style = getCategoryStyle(cat.handle);
        return {
          id: cat.id,
          name: cat.name,
          image: style.image,
          color: style.color,
          handle: cat.handle
        };
      })
    : staticCategories;

  // Categories are ready for display

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl mb-6">
          <span className="font-bold">Our</span> <span className="font-light">Categories</span>
        </h2>
        
        {isLoading ? (
          <PopularCategoriesSkeleton />
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
                <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/5">
                  <CategoryItem 
                    id={category.id}
                    name={category.name}
                    handle={category.handle}
                    image={category.image}
                    color={category.color || getRandomColor()}
                  />
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

export default PopularCategories;
