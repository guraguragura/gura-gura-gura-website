import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Thanks for subscribing!",
        description: "We'll keep you updated on our progress.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "This email may already be subscribed.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-white text-black font-sans overflow-hidden">
      <div className="grid md:grid-cols-2 h-full">
        <div className="flex items-center justify-center px-4 sm:px-8 md:px-16 h-full relative z-10 md:pt-0 pt-40">
          <div className="space-y-4 md:space-y-8 max-w-xl">
            {/* Logo positioned right above the heading */}
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

            <form onSubmit={handleSubscribe} className="w-full">
              <div className={`flex ${isMobile && window.innerWidth < 400 ? 'flex-col gap-2' : 'gap-2'}`}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300 text-sm md:text-lg flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-[#84D1D3] hover:bg-[#84D1D3]/90 text-black ${isMobile && window.innerWidth < 400 ? 'w-full' : 'px-3 sm:px-4 md:px-6'} flex items-center gap-2`}
                >
                  <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="text-sm md:text-base">Subscribe</span>
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <span className="text-xs sm:text-sm font-medium text-gray-500">SOCIAL</span>
              <div className="h-[1px] w-6 sm:w-8 md:w-12 bg-gray-200" />
              <div className="flex gap-3 sm:gap-4 md:gap-6">
                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#84D1D3] font-medium">
                  Instagram
                </a>
                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#84D1D3] font-medium">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex bg-white items-center justify-center p-8">
          <div className="w-full max-w-lg h-auto flex items-center justify-center">
            <Carousel 
              className="w-full h-auto"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[createAutoplayPlugin()]}
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <img 
                      src={image.src}
                      alt={image.alt} 
                      className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        
        {/* Mobile-only background carousel - absolutely positioned to show behind content */}
        <div className="absolute top-0 left-0 w-full h-full -z-0 md:hidden">
          <div className="relative h-full w-full">
            {/* Updated gradient that shows more of the top and fades to white at the bottom */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white z-10"></div>
            <Carousel 
              className="h-full w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[createAutoplayPlugin()]}
            >
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <img 
                      src={image.src}
                      alt="" 
                      className="h-full w-full object-contain"
                      aria-hidden="true"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
