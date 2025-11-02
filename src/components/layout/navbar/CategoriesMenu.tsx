
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CategoryWithChildren } from "./useCategoriesData";

interface CategoriesMenuProps {
  categoriesWithChildren: CategoryWithChildren[];
  staticCategories: string[];
}

const CategoriesMenu = ({ categoriesWithChildren, staticCategories }: CategoriesMenuProps) => {
  return (
    <div className="hidden md:flex items-center justify-start pl-0 space-x-6 py-2 overflow-x-auto">
      {/* Categories Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-sm hover:text-brand-teal h-auto py-2 px-2">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categoriesWithChildren.map(({ category, subcategories }) => (
                  <li key={category.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/categories/${category.handle}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{category.name}</div>
                        {subcategories.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/categories/${sub.handle}`}
                                  className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ChevronRight className="h-3 w-3 mr-1" />
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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
