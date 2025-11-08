
import React from "react";
import { Link, useLocation } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import { cn } from "@/lib/utils";

interface CategoriesMenuProps {
  staticCategories: { name: string; handle: string }[];
}

const CategoriesMenu = ({ staticCategories }: CategoriesMenuProps) => {
  const location = useLocation();
  
  const isActive = (handle: string) => {
    // Special case for deals
    if (handle === "deals") {
      return location.pathname === "/deals";
    }
    return location.pathname === `/categories/${handle}`;
  };
  
  return (
    <div className="hidden md:flex items-center justify-start pl-0 space-x-6 py-2 overflow-x-auto">
      {/* Categories mega-menu */}
      <div className="relative z-40">
        <MegaMenu />
      </div>

      {/* Static menu items */}
      {staticCategories.map((category) => (
        <Link 
          key={category.handle} 
          to={category.handle === "deals" ? "/deals" : `/categories/${category.handle}`}
          className={cn(
            "text-sm whitespace-nowrap px-1 transition-all duration-200 relative",
            "hover:text-brand-teal hover:scale-105",
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-teal after:scale-x-0 after:transition-transform after:duration-200",
            "hover:after:scale-x-100",
            isActive(category.handle) && "text-brand-teal font-semibold after:scale-x-100"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesMenu;
