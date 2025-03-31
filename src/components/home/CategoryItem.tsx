
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
  return (
    <Link 
      to={`/categories/${handle}`}
      className="group block text-center"
    >
      <div className={`rounded-lg p-4 ${color} transition-all duration-300 group-hover:shadow-md aspect-square flex items-center justify-center`}>
        <div className="w-full h-full rounded-md overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
      <h3 className="text-sm font-medium mt-2">{name}</h3>
    </Link>
  );
};

export default CategoryItem;
