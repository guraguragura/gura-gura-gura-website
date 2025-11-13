
import React, { useState } from "react";
import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import NavIcons from "./navbar/NavIcons";
import CategoriesMenu from "./navbar/CategoriesMenu";
import MobileMenu from "./navbar/MobileMenu";
import MobileHeader from "./navbar/MobileHeader";
import { useCategoriesData } from "./navbar/useCategoriesData";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

// Static categories with their correct handles
const staticCategories = [
  { name: "10K Shop", handle: "10k-shop" },
  { name: "Electronics", handle: "electronics" },
  { name: "Appliances", handle: "appliances-kitchen" },
  { name: "Deals", handle: "deals" }
];

const Navbar = () => {
  const { displayCategories } = useCategoriesData();
  const isMobile = useIsMobile();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <MobileHeader 
          displayCategories={displayCategories} 
          staticCategories={staticCategories} 
          showSearch={showMobileSearch}
          setShowSearch={setShowMobileSearch}
        />
      </header>
    );
  }

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
