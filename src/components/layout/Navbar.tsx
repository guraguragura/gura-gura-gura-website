
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
      <div className="mx-auto w-full px-3 sm:px-4 md:w-[95%] lg:w-[90%] xl:w-[80%] max-w-7xl">
        {/* Top navbar with logo and search */}
        <div className="py-2 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
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
                  <Link to="/business" className="inline-flex h-8 sm:h-10 w-max items-center justify-center rounded-md px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-accent hover:text-brand-teal focus:bg-accent focus:text-brand-teal focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <span>For Business</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/faq" className="inline-flex h-8 sm:h-10 w-max items-center justify-center rounded-md px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-accent hover:text-brand-teal focus:bg-accent focus:text-brand-teal focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    <span>Customer Services</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs sm:text-sm pr-0 h-8 sm:h-10">
                    <span className="pr-0 mr-0">Contact Us</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[250px] sm:w-[400px] gap-2 sm:gap-3 p-3 sm:p-4 md:w-[500px] md:grid-cols-2 bg-white">
                      <li className="row-span-3">
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brand-teal to-brand-teal/80 p-4 sm:p-6 no-underline outline-none focus:shadow-md"
                          to="/business"
                        >
                          <div className="mt-4 mb-2 text-base sm:text-lg font-medium text-white">
                            Gura Support
                          </div>
                          <p className="text-xs sm:text-sm leading-tight text-white/90">
                            We're here to help with any questions or concerns.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-brand-teal focus:bg-accent focus:text-brand-teal">
                          <div className="text-xs sm:text-sm font-medium leading-none">Email Support</div>
                          <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground">
                            support@gura.rw
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-brand-teal focus:bg-accent focus:text-brand-teal">
                          <div className="text-xs sm:text-sm font-medium leading-none">Phone Support</div>
                          <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground">
                            +250 788 123 456
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-brand-teal focus:bg-accent focus:text-brand-teal">
                          <div className="text-xs sm:text-sm font-medium leading-none">Visit Us</div>
                          <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground">
                            +250 788 123 456
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
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
