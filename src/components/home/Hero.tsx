import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { ArrowRight, Package, Truck, Shield } from "lucide-react";
import HeroSkeleton from "./HeroSkeleton";

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
    return <HeroSkeleton />;
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
        <div className="relative">
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
                      {isClickable ? (
                        <Link to={href} className="block w-full h-full">
                          <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </Link>
                      ) : (
                        <img
                          src={banner.image_url}
                          alt={banner.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Value proposition overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                        <div className="max-w-2xl">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 animate-fade-in">
                            Rwanda's Premier Online Shopping Destination
                          </h1>
                          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-6 animate-fade-in">
                            Shop Electronics, Appliances, Fashion & More - Delivered to Your Door
                          </p>
                          
                          {/* CTAs */}
                          <div className="flex flex-wrap gap-2 md:gap-3 animate-fade-in">
                            <Button asChild size="lg" className="shadow-lg">
                              <Link to="/products">
                                Shop Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="secondary" size="lg" className="shadow-lg">
                              <Link to="/categories">
                                Browse Categories
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-lg backdrop-blur-sm">
                              <Link to="/deals">
                                Today's Deals
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Package className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <p className="text-xs md:text-sm text-muted-foreground">10,000+ Products</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <p className="text-xs md:text-sm text-muted-foreground">Fast Delivery</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <p className="text-xs md:text-sm text-muted-foreground">Trusted by Rwandans</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
