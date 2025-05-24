
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "@/components/coming-soon/NewsletterForm";
import SocialLinks from "@/components/coming-soon/SocialLinks";
import ProductCarousel from "@/components/coming-soon/ProductCarousel";
import MobileBackgroundCarousel from "@/components/coming-soon/MobileBackgroundCarousel";

const ComingSoonPage = () => {
  const carouselImages = [
    {
      src: "/lovable-uploads/136dffde-6601-4233-8312-d998c24a2c74.png",
      alt: "Product Image 1"
    },
    {
      src: "/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png",
      alt: "Product Image 2"
    },
    {
      src: "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png",
      alt: "Product Image 3"
    },
    {
      src: "/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png",
      alt: "Product Image 4"
    },
    {
      src: "/lovable-uploads/19d49598-6533-4a1a-a7cb-95903bed38b3.png",
      alt: "Product Image 5"
    },
    {
      src: "/lovable-uploads/1d4104e3-b829-451d-a439-3c761b393137.png",
      alt: "Product Image 6"
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
      <div className="grid md:grid-cols-2 h-full">
        <div className="flex items-center justify-center px-4 sm:px-8 md:px-16 h-full relative z-10 md:pt-0 pt-40">
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
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-black">
                Coming Soon
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600">
                Local delivery, unleashed. Gura is coming.<br />
                Join the movement bringing your community together.
              </p>
            </div>

            <NewsletterForm />
            <SocialLinks />
          </div>
        </div>

        <div className="hidden md:flex bg-white items-center justify-center p-8">
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
