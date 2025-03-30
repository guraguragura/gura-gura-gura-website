
import React from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  name: string;
  handle: string;
  count: number;
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
          <li key={`loading-${index}`} className="flex justify-between items-center text-sm">
            <div className="bg-gray-200 h-4 w-28 animate-pulse rounded"></div>
            <div className="bg-gray-200 h-4 w-8 animate-pulse rounded"></div>
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <li key={category.name} className="flex justify-between items-center text-sm">
          <Link 
            to={`/categories/${category.handle}`}
            className="hover:text-blue-500 cursor-pointer"
          >
            {category.name}
          </Link>
          <span className="text-gray-500">({category.count})</span>
        </li>
      ))}
    </>
  );
};

export default CategoryList;
