
import React from "react";
import { Button } from "@/components/ui/button";

const PromotionalBanner = () => {
  return (
    <div className="lg:col-span-1 bg-blue-100 rounded-lg overflow-hidden">
      <div className="h-full flex flex-col justify-between p-6 relative">
        <div className="text-center lg:text-left">
          <div className="text-lg font-medium mb-1">Polaroid Now+ Gen 2 - White</div>
          <h3 className="text-2xl font-bold mb-6">Fresh Vegetables</h3>
          <Button className="rounded-full flex items-center gap-2 bg-white text-black hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
        <div className="mt-4 flex justify-center">
          <img 
            src="/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png" 
            alt="Polaroid Camera" 
            className="max-h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
