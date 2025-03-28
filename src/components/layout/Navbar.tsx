
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, ShoppingCartIcon, UserIcon, HeartIcon, MenuIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  "Categories", 
  "10K Shop", 
  "Electronics", 
  "Appliances", 
  "Deals"
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="mx-auto w-[80%] px-4">
        {/* Top navbar with logo and search */}
        <div className="py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Gura Shop
          </Link>

          {/* Search */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search for products, brands, etc." 
                className="pl-4 pr-10 py-2 border-2 border-blue-500 rounded-md focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
              <UserIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
              <HeartIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Wishlist</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Cart</span>
            </Button>
          </div>
        </div>

        {/* Bottom navbar with categories */}
        <div className="relative">
          <div className="hidden md:flex items-center justify-start space-x-6 py-2 overflow-x-auto">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm whitespace-nowrap hover:text-blue-600"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden py-2">
            <Button 
              variant="ghost" 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center"
            >
              <MenuIcon className="h-5 w-5 mr-2" />
              Categories
            </Button>
            
            {menuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border shadow-lg z-50 py-2">
                {categories.map((category) => (
                  <Link 
                    key={category} 
                    to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
