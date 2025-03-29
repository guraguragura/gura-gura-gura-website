
import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
