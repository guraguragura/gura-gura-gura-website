
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  images: Array<{ src: string; alt: string }>;
  autoplayPlugin: any;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
  images, 
  autoplayPlugin, 
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-2xl h-auto flex items-center justify-start pl-4 ${className}`}>
      <Carousel 
        className="w-full h-auto"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-96 overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.src}
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
