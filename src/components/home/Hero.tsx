
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Summer Collection",
    subtitle: "Up to 30% off",
    buttonText: "Shop Now"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555529771-122e5d9f2341",
    title: "New Arrivals",
    subtitle: "Explore the latest trends",
    buttonText: "Discover"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    title: "Accessories",
    subtitle: "Complete your look",
    buttonText: "View Collection"
  }
];

const Hero = () => {
  const [api, setApi] = React.useState<any>(null);

  // Auto-scroll hero carousel
  React.useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Longer interval for hero carousel
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-4">
      <div className="container mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full rounded-lg overflow-hidden">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  
                  {/* Content positioned over the banner */}
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <div className="max-w-md">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-2">
                        {slide.title}
                      </h1>
                      <p className="text-xl text-white/90 mb-6">{slide.subtitle}</p>
                      <Button size="lg">{slide.buttonText}</Button>
                    </div>
                  </div>
                </div>
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

export default Hero;
