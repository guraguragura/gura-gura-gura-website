
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryWithChildren } from "./useCategoriesData";

interface CategoriesMenuProps {
  categoriesWithChildren: CategoryWithChildren[];
  staticCategories: string[];
}

const CategoriesMenu = ({ categoriesWithChildren, staticCategories }: CategoriesMenuProps) => {
  return (
    <div className="hidden md:flex items-center justify-start pl-0 space-x-6 py-2 overflow-x-auto">
      {/* Categories Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-sm hover:text-brand-teal h-auto py-2 px-2"
          >
            Categories
            <ChevronRight className="h-4 w-4 ml-1 rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] md:w-[500px] lg:w-[600px] p-4 bg-background border shadow-md z-50">
          <div className="grid grid-cols-2 gap-3">
            {categoriesWithChildren.map(({ category, subcategories }) => (
              <div key={category.id} className="space-y-2">
                <Link
                  to={`/categories/${category.handle}`}
                  className="block text-sm font-medium hover:text-brand-teal transition-colors"
                >
                  {category.name}
                </Link>
                {subcategories.length > 0 && (
                  <ul className="space-y-1">
                    {subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          to={`/categories/${sub.handle}`}
                          className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronRight className="h-3 w-3 mr-1" />
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
