
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Make sure we always have at least one image to display
  const displayImages = images.length > 0 ? images : ['/placeholder.svg'];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative bg-white p-4 rounded-lg h-80 flex items-center justify-center overflow-hidden">
        <img 
          src={displayImages[activeImage]} 
          alt={title} 
          className="max-h-full max-w-full object-contain transition-all duration-300"
        />
        
        {/* Navigation arrows (only show if we have more than one image) */}
        {displayImages.length > 1 && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 bg-white/80 hover:bg-white rounded-full"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 bg-white/80 hover:bg-white rounded-full"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {displayImages.length > 1 && (
        <div className="flex justify-center space-x-2 overflow-x-auto">
          {displayImages.map((image, idx) => (
            <div 
              key={idx}
              className={`p-2 border rounded-md cursor-pointer transition-all ${
                activeImage === idx 
                  ? 'border-blue-500 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveImage(idx)}
            >
              <img 
                src={image} 
                alt={`${title} - view ${idx+1}`} 
                className="h-16 w-16 object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
