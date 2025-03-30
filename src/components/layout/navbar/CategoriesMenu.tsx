
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
  return (
    <div className="hidden md:flex items-center justify-start space-x-6 py-2 overflow-x-auto">
      {/* Categories dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm hover:text-brand-teal">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 p-4 w-[400px] md:w-[600px] gap-3 bg-white">
                {displayCategories.map((category) => (
                  <Link 
                    key={category.id}
                    to={`/categories/${category.handle}`}
                    className="block p-2 hover:bg-gray-50 rounded"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link 
                  to="/collections"
                  className="col-span-2 md:col-span-3 p-2 mt-3 text-brand-teal font-medium text-sm hover:underline"
                >
                  View All Categories →
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Static menu items */}
      {staticCategories.map((category) => (
        <Link 
          key={category} 
          to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm whitespace-nowrap hover:text-brand-teal"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesMenu;
