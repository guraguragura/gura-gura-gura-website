import React from "react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: banners, isLoading } = useBanners('hero');

  // Auto-scroll hero carousel
  React.useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [api]);

  if (isLoading) {
    return <Skeleton className="w-full h-[450px]" />;
  }

  const displayBanners = banners && banners.length > 0 ? banners : heroSlides.map((slide, idx) => ({
    id: `fallback-${idx}`,
    title: slide.title,
    image_url: slide.image,
    placement: 'hero' as const,
    link_type: 'none' as const,
    link_value: null,
    display_order: idx,
    is_active: true,
    start_date: null,
    end_date: null
  }));

  return (
    <section className="py-1 md:py-4">
      <div className="w-full px-2 md:px-4 mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {displayBanners.map((banner) => {
              const href = getBannerLink(banner);
              const isClickable = banner.link_type !== 'none' && href !== '#';

              return (
                <CarouselItem key={banner.id}>
                  <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] w-full rounded-lg overflow-hidden group">
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                    {isClickable && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-8 md:pb-12">
                        <Link to={href}>
                          <Button 
                            size="lg" 
                            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-6 text-base md:text-lg shadow-lg transform group-hover:scale-105 transition-transform"
                          >
                            Shop Now
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
