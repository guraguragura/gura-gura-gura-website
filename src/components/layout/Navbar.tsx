
import React from "react";
import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import NavIcons from "./navbar/NavIcons";
import CategoriesMenu from "./navbar/CategoriesMenu";
import MobileMenu from "./navbar/MobileMenu";
import { useCategoriesData } from "./navbar/useCategoriesData";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Static categories that don't need to be fetched
const staticCategories = ["10K Shop", "Electronics", "Appliances", "Deals"];

const Navbar = () => {
  const { displayCategories } = useCategoriesData();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="mx-auto w-[80%] px-4">
        {/* Top navbar with logo and search */}
        <div className="py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <SearchBar />
          <NavIcons />
        </div>

        {/* Bottom navbar with categories */}
        <div className="relative">
          <div className="flex items-center justify-between">
            <CategoriesMenu 
              displayCategories={displayCategories} 
              staticCategories={staticCategories} 
            />
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm">More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                            to="/business"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Gura for Business
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Enterprise solutions for businesses of all sizes.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link to="/partner" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Partner with Gura</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Sell your products on our marketplace.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/app" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Gura App</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Download our mobile application.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about Gura's story.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/advantages" className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Advantages
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/business" className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Business
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/partner" className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Sellers
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <MobileMenu 
            displayCategories={displayCategories} 
            staticCategories={staticCategories} 
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
