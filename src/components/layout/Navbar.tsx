
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, ShoppingCartIcon, UserIcon, HeartIcon, MenuIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

const staticCategories = ["10K Shop", "Electronics", "Appliances", "Deals"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        } else {
          console.log("Categories fetched:", data);
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fallback categories in case the data fetch fails
  const fallbackCategories = [
    { id: "pcat_01", name: "Women's Collection", handle: "women" },
    { id: "pcat_02", name: "Men's Collection", handle: "men" },
    { id: "pcat_03", name: "Home & Art", handle: "home-art" },
    { id: "pcat_04", name: "Kids", handle: "kids" },
    { id: "pcat_05", name: "Beauty", handle: "beauty" },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="mx-auto w-[80%] px-4">
        {/* Top navbar with logo and search */}
        <div className="py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo - replacing text with image */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
              alt="Gura Logo" 
              className="h-10" 
            />
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
            <Link to="/account">
              <Button variant="ghost" size="sm" className="flex flex-col items-center p-1">
                <UserIcon className="h-5 w-5" />
                <span className="text-xs mt-1">Account</span>
              </Button>
            </Link>
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
            {/* Categories dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm hover:text-blue-600">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 p-4 w-[400px] md:w-[600px] gap-3">
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
                        className="col-span-2 md:col-span-3 p-2 mt-3 text-blue-600 font-medium text-sm hover:underline"
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
                className="text-sm whitespace-nowrap hover:text-blue-600"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
