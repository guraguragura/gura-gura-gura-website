
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryBreadcrumbProps {
  categoryName: string;
}

const CategoryBreadcrumb = ({ categoryName }: CategoryBreadcrumbProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 ${isMobile ? 'mb-3' : 'mb-6'}`}>
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      <span className="font-semibold text-gray-700 truncate">{categoryName || "Product Category"}</span>
    </div>
  );
};

export default CategoryBreadcrumb;
