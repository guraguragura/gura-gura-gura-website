
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CategoryBreadcrumbProps {
  categoryName: string;
}

const CategoryBreadcrumb = ({ categoryName }: CategoryBreadcrumbProps) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-semibold text-gray-700">{categoryName || "Product Category"}</span>
    </div>
  );
};

export default CategoryBreadcrumb;
