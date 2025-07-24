
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isSubmitting } = useNewsletter({ source: 'coming_soon_page' });
  const isMobile = useIsMobile();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
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
