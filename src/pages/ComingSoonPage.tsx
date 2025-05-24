
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
            {/* Logo positioned with left alignment matching the heading on mobile */}
            <Link to="/" className="absolute top-4 left-4 md:top-6 md:left-6">
              <img 
                src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
                alt="Gura Logo" 
                className="h-12 sm:h-10 md:h-12 w-auto" 
              />
            </Link>
            
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

        <div className="hidden md:flex bg-[#F7D44C] items-center justify-center p-8">
          <div className="w-4/5 h-4/5 max-w-md">
            <img 
              src="/lovable-uploads/91bfa46b-f06e-44de-bc8b-4315b8e5ff43.png"
              alt="Happy Customer with Shopping Bags" 
              className="h-full w-full object-cover object-top rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Mobile-only background image - absolutely positioned to show behind content */}
        <div className="absolute top-0 left-0 w-full h-full -z-0 md:hidden">
          <div className="relative h-full w-full">
            {/* Updated gradient that shows more of the top and fades to white at the bottom */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white z-10"></div>
            <img 
              src="/lovable-uploads/91bfa46b-f06e-44de-bc8b-4315b8e5ff43.png"
              alt="" 
              className="h-full w-full object-cover object-top"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
