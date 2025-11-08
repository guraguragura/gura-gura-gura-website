
import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  handle: string;
}

interface MobileMenuProps {
  displayCategories: Category[];
  staticCategories: { name: string; handle: string }[];
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
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {/* Categories */}
          <DropdownMenuItem>
            <span className="font-semibold">Categories</span>
          </DropdownMenuItem>
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
          {staticCategories.map((category) => (
            <DropdownMenuItem key={category.handle} asChild>
              <Link 
                to={`/categories/${category.handle}`}
                className="w-full"
              >
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          {/* Navigation Links */}
          <DropdownMenuItem asChild>
            <Link to="/business" className="w-full">
              For Business
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/faq" className="w-full">
              Customer Services
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/contact" className="w-full">
              Contact Us
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileMenu;
