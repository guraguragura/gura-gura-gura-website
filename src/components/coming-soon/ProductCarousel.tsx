
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
    <div className={`w-full max-w-lg h-auto flex items-center justify-center ${className}`}>
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
              <img 
                src={image.src}
                alt={image.alt} 
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
