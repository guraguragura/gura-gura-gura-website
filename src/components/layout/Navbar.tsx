
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png" 
              alt="Gura" 
              className="h-12"
            />
          </Link>
          
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center mx-auto max-w-xl w-full px-4">
            <div className="relative flex items-center w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10 rounded-full border-gray-300 focus:ring-0 focus:border-gray-400 pl-4"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </form>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="User account">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <Separator className="my-2" />
          <nav className="hidden md:flex items-center justify-center space-x-10 py-2">
            <Link to="/shop" className="text-gray-600 hover:text-black font-medium">Shop</Link>
            <Link to="/collections" className="text-gray-600 hover:text-black font-medium">Collections</Link>
            <Link to="/about" className="text-gray-600 hover:text-black font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-black font-medium">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
