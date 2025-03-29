
import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  handle: string;
}

interface MobileMenuProps {
  displayCategories: Category[];
  staticCategories: string[];
}

const MobileMenu = ({ displayCategories, staticCategories }: MobileMenuProps) => {
  return (
    <div className="md:hidden py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center"
          >
            <MenuIcon className="h-5 w-5 mr-2" />
            Categories
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {displayCategories.map((category) => (
            <DropdownMenuItem key={category.id} asChild>
              <Link 
                to={`/categories/${category.handle}`}
                className="w-full"
              >
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <Link to="/collections" className="w-full text-blue-600">
              View All Categories
            </Link>
          </DropdownMenuItem>
          {staticCategories.map((category) => (
            <DropdownMenuItem key={category} asChild>
              <Link 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-full"
              >
                {category}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
