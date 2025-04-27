
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Prevent scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
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
        {/* Left Content */}
        <div className="flex items-center justify-center px-16 h-full">
          <div className="space-y-12 max-w-xl -mt-24">
            <Link to="/" className="inline-block">
              <img 
                src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
                alt="Gura Logo" 
                className="h-12 w-auto" 
              />
            </Link>
            
            <div className="space-y-4">
              <h1 className="text-6xl font-bold tracking-tight text-black">
                Coming Soon
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Local delivery, unleashed. Gura is coming.<br />
                Join the movement bringing your community together.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300 text-lg flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#84D1D3] hover:bg-[#84D1D3]/90 text-black px-6 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-500">SOCIAL</span>
              <div className="h-[1px] w-12 bg-gray-200" />
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-[#84D1D3] text-sm font-medium">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-[#84D1D3] text-sm font-medium">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-[#84D1D3] text-sm font-medium">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block bg-[#F7D44C]">
          <img 
            src="/lovable-uploads/91bfa46b-f06e-44de-bc8b-4315b8e5ff43.png"
            alt="Happy Customer with Shopping Bags" 
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
