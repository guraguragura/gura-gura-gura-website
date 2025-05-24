
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface MobileBackgroundCarouselProps {
  images: Array<{ src: string; alt: string }>;
  autoplayPlugin: any;
}

const MobileBackgroundCarousel: React.FC<MobileBackgroundCarouselProps> = ({ 
  images, 
  autoplayPlugin 
}) => {
  return (
    <div className="absolute top-40 -left-8 w-[120%] h-[calc(100%-10rem)] -z-0 md:hidden">
      <div className="relative h-full w-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white z-10"></div>
        <Carousel 
          className="h-full w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayPlugin]}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <img 
                  src={image.src}
                  alt="" 
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default MobileBackgroundCarousel;
