
import React from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  handle: string;
}

interface CategoriesMenuProps {
  displayCategories: Category[];
  staticCategories: string[];
}

const CategoriesMenu = ({ displayCategories, staticCategories }: CategoriesMenuProps) => {
  const handleCategorySelect = (value: string) => {
    // Navigate to the selected category
    if (value === "view-all") {
      window.location.href = "/collections";
    } else {
      window.location.href = `/categories/${value}`;
    }
  };

  return (
    <div className="hidden md:flex items-center justify-start pl-0 space-x-6 py-2 overflow-x-auto">
      {/* Categories dropdown using Select */}
      <div className="relative z-40">
        <Select onValueChange={handleCategorySelect}>
          <SelectTrigger className="w-[130px] bg-white text-sm hover:text-brand-teal border-none shadow-none focus:ring-0 px-2 py-2">
            <span className="mr-0 pr-0">Categories</span>
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            <SelectGroup>
              {displayCategories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.handle}
                  className="cursor-pointer"
                >
                  {category.name}
                </SelectItem>
              ))}
              <SelectItem value="view-all" className="text-brand-teal font-medium">
                View Collections →
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Static menu items */}
      {staticCategories.map((category) => (
        <Link 
          key={category} 
          to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm whitespace-nowrap hover:text-brand-teal px-1"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesMenu;
