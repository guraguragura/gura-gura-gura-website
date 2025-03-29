
import React from "react";
import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import NavIcons from "./navbar/NavIcons";
import CategoriesMenu from "./navbar/CategoriesMenu";
import MobileMenu from "./navbar/MobileMenu";
import { useCategoriesData } from "./navbar/useCategoriesData";

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
          <CategoriesMenu 
            displayCategories={displayCategories} 
            staticCategories={staticCategories} 
          />
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
