import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryMegaMenu } from "./useCategoryMegaMenu";
import { Skeleton } from "@/components/ui/skeleton";

const MegaMenu = () => {
  const { parentCategories, subcategoriesByParent, loading } = useCategoryMegaMenu();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (loading) {
    return <Skeleton className="w-[130px] h-9" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-2 text-sm hover:text-primary focus:outline-none">
        Categories
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[600px] p-0 bg-background border border-border z-50"
        align="start"
      >
        <div className="grid grid-cols-[240px_1fr] min-h-[400px] max-h-[500px]">
          {/* Left Column - Main Categories */}
          <div className="border-r border-border overflow-y-auto bg-muted/30">
            {parentCategories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.handle}`}
                onMouseEnter={() => setActiveCategory(category.id)}
                className={`block px-4 py-3 text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'hover:bg-muted'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right Column - Subcategories */}
          <div className="overflow-y-auto p-4 bg-background">
            {activeCategory && subcategoriesByParent[activeCategory] ? (
              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  Subcategories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {subcategoriesByParent[activeCategory].map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/categories/${subcategory.handle}`}
                      className="px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-foreground"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                {activeCategory 
                  ? "No subcategories available"
                  : "Hover over a category to see subcategories"
                }
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MegaMenu;
