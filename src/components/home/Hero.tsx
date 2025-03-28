
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto">
        <div className="relative rounded-lg overflow-hidden">
          {/* Full width banner image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Japanese Fashion Banner" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            
            {/* Content positioned over the banner */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
                  Modern Japanese Style
                </h1>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button size="lg">Shop Now</Button>
                  <Button variant="outline" size="lg" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30">
                    View Collections
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
