
import React from "react";
import { Button } from "@/components/ui/button";

const FeaturedPromoBanner = () => {
  return (
    <div className="lg:col-span-1 rounded-lg overflow-hidden relative">
      <div className="bg-indigo-900 h-full w-full rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-24 h-24 bg-indigo-600 rounded-full opacity-30 -top-10 -right-10"></div>
          <div className="absolute w-32 h-32 bg-indigo-600 rounded-full opacity-30 -bottom-20 -left-20"></div>
        </div>
        
        <div className="relative h-full p-3 flex flex-col justify-between">
          <div>
            <div className="bg-amber-400 text-amber-800 text-[10px] font-bold rounded-full px-1.5 py-0.5 inline-block mb-1">20% off</div>
            <h3 className="text-white text-xs font-bold mb-0.5 leading-tight">iPhone Smart Phone - Red</h3>
            <div className="text-indigo-200 text-[10px] mb-0.5">FROM</div>
            <div className="text-white text-sm font-bold mb-1">$890</div>
          </div>
          
          <div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-0.5 flex items-center gap-1 text-[10px] h-5">
              Shop Now
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5"
              >
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
          </div>
          
          <div className="absolute bottom-0 right-0 w-20 h-20">
            <img 
              src="/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png" 
              alt="iPhone Smart Phone" 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPromoBanner;
