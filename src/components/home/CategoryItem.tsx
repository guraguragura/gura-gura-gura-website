
import React from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  id: string;
  name: string;
  handle: string;
  image: string;
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, handle, image, color }) => {
  // Debug image URL
  
  
  return (
    <Link to={`/categories/${handle}`} className="block group">
      <div className={`rounded-lg p-2 ${color} hover:shadow-md transition-all duration-200`}>
        <div className="relative h-48 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1472851294608-062f824d29cc"; // Fallback image
              console.error(`Failed to load image for ${name}:`, image);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="p-3 w-full">
              <h3 className="text-white text-center font-medium">{name}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
