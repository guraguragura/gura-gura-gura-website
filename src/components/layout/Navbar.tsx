
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Fetch categories from the product_category table in MedusaJS database via Supabase
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle')
          .eq('is_active', true)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
          setCategories([]);
        } else {
          setCategories(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission here
    console.log("Searching for:", searchQuery);
  };
  
  // Fallback categories in case the database fetch fails
  const fallbackCategories = [
    { id: "women", name: "Women's Collection", handle: "women" },
    { id: "men", name: "Men's Collection", handle: "men" },
    { id: "accessories", name: "Accessories", handle: "accessories" }
  ];
  
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  
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
                className="w-full pr-10 rounded-full border-gray-300 focus:ring-0 focus:border-gray-400 pl-4 h-12 text-base"
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
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-600 hover:text-black font-medium flex items-center gap-1">
                    Categories <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {isLoading ? (
                    <DropdownMenuItem disabled>Loading categories...</DropdownMenuItem>
                  ) : (
                    displayCategories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link to={`/categories/${category.handle}`} className="w-full">
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/10k-shop" className="text-gray-600 hover:text-black font-medium">10k Shop</Link>
            <Link to="/electronics" className="text-gray-600 hover:text-black font-medium">Electronics</Link>
            <Link to="/appliances" className="text-gray-600 hover:text-black font-medium">Appliances</Link>
            <Link to="/deals" className="text-gray-600 hover:text-black font-medium">Deals</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
