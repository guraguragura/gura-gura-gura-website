
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
  );
};

export default NewsletterForm;
