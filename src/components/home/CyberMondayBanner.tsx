
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CyberMondayBanner = () => {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto">
        <div className="rounded-lg overflow-hidden relative">
          <div className="bg-[#14153f] w-full rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-full bg-gradient-to-r from-[#14153f] to-[#2e3065] opacity-70"></div>
              {/* Diagonal lines background decoration */}
              <div className="absolute inset-0" 
                style={{ 
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
                  backgroundSize: '100px 100px'
                }}>
              </div>
            </div>
            
            <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
              {/* Left section - Person with shopping bags */}
              <div className="w-full md:w-1/3 relative z-10">
                <img 
                  src="/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png" 
                  alt="Cyber Monday Shopping" 
                  className="object-contain max-h-[240px] md:max-h-[280px]"
                />
              </div>
              
              {/* Middle section - Sale text */}
              <div className="w-full md:w-1/3 text-center md:text-left relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">CYBER MONDAY</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">SALE</h3>
                <p className="text-white text-xl mb-2">UP TO 30% OFF</p>
                <p className="text-white text-sm mb-6">COMPUTER & MOBILE ACCESSORIES</p>
                <Link to="/shop">
                  <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-[#14153f] px-6">
                    Shop Now
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4">
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </Link>
              </div>
              
              {/* Right section - Devices */}
              <div className="w-full md:w-1/3 flex items-center justify-end relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                  alt="Computer and mobile devices" 
                  className="object-contain max-h-[240px] md:max-h-[280px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberMondayBanner;
