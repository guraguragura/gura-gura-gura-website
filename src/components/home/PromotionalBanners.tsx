
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromotionalBanners = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monitor Promo Banner */}
          <div className="rounded-lg overflow-hidden relative bg-[#e6eef5]">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-2">
                <span className="font-medium text-sm uppercase">UP TO 30% OFF</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                57" Odyssey Neo G9 Dual<br />
                4K UHD Quantum Mini-LED
              </h3>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="rounded-full border-black text-black hover:bg-black hover:text-white"
                >
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 max-w-[45%]">
                <img 
                  src="/lovable-uploads/19d49598-6533-4a1a-a7cb-95903bed38b3.png" 
                  alt="Samsung Odyssey Neo G9 Monitor" 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Smartwatch Promo Banner */}
          <div className="rounded-lg overflow-hidden relative bg-[#e6f5ef]">
            <div className="p-8 flex flex-col h-full">
              <div className="mb-2">
                <span className="font-medium text-sm uppercase">UP TO 30% OFF</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Apple Watch Series 8<br />
                GPS + Cellular
              </h3>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="rounded-full border-black text-black hover:bg-black hover:text-white"
                >
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 max-w-[45%]">
                <img 
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12" 
                  alt="Apple Watch" 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
