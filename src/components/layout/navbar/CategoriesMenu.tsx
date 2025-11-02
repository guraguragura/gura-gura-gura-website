
import React, { useState } from "react";
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
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  
  const hoveredCategory = categoriesWithChildren.find(
    ({ category }) => category.id === hoveredCategoryId
  );

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
        <DropdownMenuContent className="w-[700px] p-0 bg-background border shadow-md z-50">
          <div className="flex min-h-[400px]">
            {/* Left Column - Parent Categories */}
            <div className="w-64 border-r border-border">
              {categoriesWithChildren.map(({ category }) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.handle}`}
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                  className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Right Column - Subcategories */}
            <div className="flex-1 p-6">
              {hoveredCategory ? (
                <div>
                  <h3 className="text-sm font-semibold mb-4 text-foreground">
                    {hoveredCategory.category.name}
                  </h3>
                  {hoveredCategory.subcategories.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {hoveredCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/categories/${sub.handle}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                        >
                          {sub.metadata?.image && (
                            <img 
                              src={sub.metadata.image} 
                              alt={sub.name}
                              className="w-6 h-6 object-cover rounded flex-shrink-0"
                            />
                          )}
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No subcategories available</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  Hover over a category to see subcategories
                </div>
              )}
            </div>
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
