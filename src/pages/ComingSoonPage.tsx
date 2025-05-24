import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/coming-soon/NewsletterForm";
import SocialLinks from "@/components/coming-soon/SocialLinks";
import ProductCarousel from "@/components/coming-soon/ProductCarousel";
import MobileBackgroundCarousel from "@/components/coming-soon/MobileBackgroundCarousel";

const ComingSoonPage = () => {
  const carouselImages = [
    {
      src: "/lovable-uploads/d5e58add-86a9-491c-b3e2-ca380524e254.png",
      alt: "Washing Machine"
    },
    {
      src: "/lovable-uploads/bfa0e35e-65cd-4463-8936-12bb49a038ed.png",
      alt: "Yellow Car"
    },
    {
      src: "/lovable-uploads/2e970dc1-e8bd-4b6c-badd-cd0e005681e6.png",
      alt: "Gaming Controller"
    },
    {
      src: "/lovable-uploads/72f88cbc-15c4-4d41-94fe-0de3eb6336a3.png",
      alt: "Desk Lamp"
    },
    {
      src: "/lovable-uploads/e514159f-9955-4ab6-b125-cec4fa80e32c.png",
      alt: "Yellow Earphones"
    },
    {
      src: "/lovable-uploads/71a9030d-5d42-4ab2-9094-6e27ccb2f3fe.png",
      alt: "iPhone and AirPods"
    },
    {
      src: "/lovable-uploads/20baac49-7e2c-4aab-beff-16091ed03fa2.png",
      alt: "Basketball"
    },
    {
      src: "/lovable-uploads/ef568fa7-7d69-42cf-9696-866a4075928b.png",
      alt: "Fashion Portrait"
    },
    {
      src: "/lovable-uploads/8273b9c4-c7f0-464d-ba14-b2c91e9c18fc.png",
      alt: "Tonic Bottle"
    }
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const createAutoplayPlugin = () => {
    let interval: NodeJS.Timeout;
    
    return {
      name: 'autoplay',
      options: {},
      init: (embla: any) => {
        const autoplay = () => {
          if (!embla.canScrollNext()) {
            embla.scrollTo(0);
          } else {
            embla.scrollNext();
          }
        };
        
        interval = setInterval(autoplay, 3000);
      },
      destroy: () => {
        if (interval) {
          clearInterval(interval);
        }
      }
    };
  };

  const autoplayPlugin = createAutoplayPlugin();

  return (
    <div className="h-screen w-full bg-white text-black font-sans overflow-hidden">
      <div className="grid md:grid-cols-2 h-full md:gap-4">
        {/* Mobile Layout - Keep existing */}
        <div className="flex md:hidden flex-col h-full relative z-10">
          {/* Logo at the top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img 
                src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
                alt="Gura Logo" 
                className="h-10 w-auto" 
              />
            </Link>
          </div>
          
          {/* Main content moved down below carousel */}
          <div className="flex-1 flex items-end justify-center px-6 pb-20">
            <div className="space-y-6 text-center max-w-sm">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight text-black">
                  Coming Soon
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">
                  Shop Local. Delivered Fast.<br />
                  Bringing Kigali closer, one delivery at a time.
                </p>
              </div>

              <NewsletterForm />
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Desktop Layout - Move text closer to carousel */}
        <div className="hidden md:flex items-center justify-end pr-8 h-full relative z-10">
          <div className="space-y-4 md:space-y-8 max-w-xl">
            <div className="flex justify-start mb-4">
              <Link to="/">
                <img 
                  src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
                  alt="Gura Logo" 
                  className="h-12 sm:h-10 md:h-12 w-auto" 
                />
              </Link>
            </div>
            
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-black -ml-1">
                Coming Soon
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
                Shop Local. Delivered Fast.<br />
                Bringing Kigali closer, one delivery at a time.
              </p>
            </div>

            <NewsletterForm />
            <SocialLinks />
          </div>
        </div>

        <div className="hidden md:flex bg-white items-center justify-start pl-4">
          <ProductCarousel 
            images={carouselImages} 
            autoplayPlugin={autoplayPlugin} 
          />
        </div>
        
        <MobileBackgroundCarousel 
          images={carouselImages} 
          autoplayPlugin={createAutoplayPlugin()} 
        />
      </div>
    </div>
  );
};

export default ComingSoonPage;
