
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Modern Japanese Fashion
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-md">
              Elevate your style with our curated collection of contemporary Japanese designs.
            </p>
            <div className="pt-4">
              <Button size="lg" className="mr-4">Shop Now</Button>
              <Button variant="outline" size="lg">View Collections</Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Japanese Fashion" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
