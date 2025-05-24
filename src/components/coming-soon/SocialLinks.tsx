
import React from "react";
import { Button } from "@/components/ui/button";

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
      <span className="text-xs sm:text-sm font-medium text-gray-500">SOCIAL</span>
      <div className="h-[1px] w-6 sm:w-8 md:w-12 bg-gray-200" />
      <div className="flex gap-3 sm:gap-4 md:gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs sm:text-sm text-gray-600 hover:text-[#84D1D3] font-medium p-0 h-auto"
          onClick={() => window.open("https://www.instagram.com/guragura.rw?igsh=MWZyMDl0cGZkNzVhYg%3D%3D&utm_source=qr", "_blank")}
        >
          Instagram
        </Button>
        <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#84D1D3] font-medium">
          Facebook
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
