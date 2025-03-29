
import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div>
      <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center h-80">
        <img 
          src={images[activeImage]} 
          alt={title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex justify-center space-x-2 overflow-x-auto">
        {images.map((image, idx) => (
          <div 
            key={idx}
            className={`p-2 border rounded-md cursor-pointer ${activeImage === idx ? 'border-blue-500' : 'border-gray-200'}`}
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
    </div>
  );
};

export default ProductImageGallery;
