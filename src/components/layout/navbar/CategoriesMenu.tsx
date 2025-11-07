
import React from "react";
import { Link } from "react-router-dom";
import MegaMenu from "./MegaMenu";

interface CategoriesMenuProps {
  staticCategories: string[];
}

const CategoriesMenu = ({ staticCategories }: CategoriesMenuProps) => {
  return (
    <div className="hidden md:flex items-center justify-start pl-0 space-x-6 py-2 overflow-x-auto">
      {/* Categories mega-menu */}
      <div className="relative z-40">
        <MegaMenu />
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
