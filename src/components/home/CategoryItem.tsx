
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
      className="group block"
    >
      <div className={`rounded-lg p-4 ${color} transition-all duration-300 group-hover:shadow-md flex flex-col items-center text-center`}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden mb-3">
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
        <h3 className="text-sm font-medium">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
