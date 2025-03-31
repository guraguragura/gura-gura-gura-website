
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
  
  // Use DB categories if available, otherwise use static ones
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

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Our <span className="font-normal">Categories</span></h2>
        
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
