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
  "women": "/lovable-uploads/95be1088-bdc1-4e5f-adf3-f3d8274a774b.png",
  "men": "/lovable-uploads/3444a916-c7fa-441c-8ac5-46fff6a723b0.png",
  "electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
  "books": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  "home-kitchen": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
  "fashion": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "sports-outdoors": "/lovable-uploads/9d63294e-b5da-482e-bab3-e585c3da4015.png",
  "health-beauty": "/lovable-uploads/7d883551-ca4e-4d2d-891b-a0f8a17496f7.png",
  "kids-toys": "/lovable-uploads/ee7d75cc-e5d9-43fb-9381-a969386ddab7.png",
  "automotive": "/lovable-uploads/ea338bf4-ab81-449c-b252-6f5c79c8bfad.png",
  "10k-shop": "/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png",
  "home-art": "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png",
  "appliances-kitchen": "/lovable-uploads/92f98a77-737e-4626-8174-6622fef36bb0.png",
  "phones-accessories": "/lovable-uploads/9cb8ab96-34b6-412d-8a93-69dd5dacf8c5.png"
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
