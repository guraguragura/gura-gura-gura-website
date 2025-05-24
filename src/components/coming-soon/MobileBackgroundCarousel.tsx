
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
    <div className="absolute top-0 left-0 w-full h-full">
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
  );
};

export default MobileBackgroundCarousel;
