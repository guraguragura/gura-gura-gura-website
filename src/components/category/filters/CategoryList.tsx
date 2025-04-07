
import React from "react";
import { Link } from "react-router-dom";
import { getCategoryStyle } from "@/utils/categoryUtils";

interface CategoryItemProps {
  name: string;
  handle: string;
  count: number;
  image?: string;
}

interface CategoryListProps {
  categories: CategoryItemProps[];
  loading: boolean;
}

const CategoryList = ({ categories, loading }: CategoryListProps) => {
  if (loading) {
    return (
      <>
        {Array(5).fill(null).map((_, index) => (
          <li key={`loading-${index}`} className="flex items-center text-sm mb-3">
            <div className="bg-gray-200 h-8 w-8 rounded-full mr-3 animate-pulse"></div>
            <div className="flex flex-col flex-grow">
              <div className="bg-gray-200 h-4 w-28 animate-pulse rounded"></div>
              <div className="bg-gray-200 h-3 w-8 animate-pulse rounded mt-1"></div>
            </div>
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <li key={category.name} className="flex items-center mb-3 hover:bg-gray-50 rounded p-1">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-3 bg-gray-100">
            <img 
              src={getCategoryStyle(category.handle).image} 
              alt={category.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="flex justify-between items-center flex-grow">
            <Link 
              to={`/categories/${category.handle}`}
              className="hover:text-blue-500 cursor-pointer text-sm"
            >
              {category.name}
            </Link>
            <span className="text-gray-500 text-xs">({category.count})</span>
          </div>
        </li>
      ))}
    </>
  );
};

export default CategoryList;
