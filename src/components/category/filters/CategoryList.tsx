
import React from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  name: string;
  handle: string;
  count: number;
  image?: string; // Added image property
}

interface CategoryListProps {
  categories: CategoryItemProps[];
  loading: boolean;
}

// Mapping of category handles to image URLs
const categoryImages: Record<string, string> = {
  "women": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "men": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
  "books": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  "home-kitchen": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
  "fashion": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "sports-outdoors": "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  "health-beauty": "https://images.unsplash.com/photo-1607006677169-a62beb975922",
  "kids-toys": "https://images.unsplash.com/photo-1522771930-78848d9293e8",
  "automotive": "https://images.unsplash.com/photo-1542362567-b07e54358753",
  "10k-shop": "/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png",
  "home-art": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
  "accessories": "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
};

// Helper function to get image for a category
const getCategoryImage = (handle: string): string => {
  return categoryImages[handle] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc"; // Default image
};

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
              src={getCategoryImage(category.handle)} 
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
