
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png" 
                alt="Gura" 
                className="h-12"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/shop" className="text-gray-600 hover:text-black">Shop</Link>
              <Link to="/collections" className="text-gray-600 hover:text-black">Collections</Link>
              <Link to="/about" className="text-gray-600 hover:text-black">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-black">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Search">
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
      </div>
    </header>
  );
};

export default Navbar;
