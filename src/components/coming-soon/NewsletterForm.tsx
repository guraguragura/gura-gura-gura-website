
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Loader2, MessageCircle } from "lucide-react";
import { useBrevo } from "@/hooks/useBrevo";
import { useIsMobile } from "@/hooks/use-mobile";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { subscribeToNewsletter } = useBrevo();
  const isMobile = useIsMobile();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter({ 
        email, 
        phone: phone || undefined,
        whatsappOptIn: whatsappOptIn && !!phone
      });
      setEmail("");
      setPhone("");
      setWhatsappOptIn(false);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="w-full space-y-4">
      <div className={`flex ${isMobile && window.innerWidth < 400 ? 'flex-col gap-2' : 'gap-2'}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="bg-white border-gray-300 text-sm md:text-lg flex-1"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={`bg-[#84D1D3] hover:bg-[#84D1D3]/90 text-black ${isMobile && window.innerWidth < 400 ? 'w-full' : 'px-3 sm:px-4 md:px-6'} flex items-center gap-2`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
              <span className="text-sm md:text-base">Subscribing...</span>
            </>
          ) : (
            <>
              <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-sm md:text-base">Subscribe</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-3">
        <Input
          type="tel"
          placeholder="Phone number (optional, for WhatsApp updates)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isSubmitting}
          className="bg-white border-gray-300 text-sm md:text-lg"
        />
        
        {phone && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="whatsapp-opt-in"
              checked={whatsappOptIn}
              onCheckedChange={setWhatsappOptIn}
              disabled={isSubmitting}
            />
            <label htmlFor="whatsapp-opt-in" className="text-sm text-gray-600 flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Send me updates via WhatsApp
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default NewsletterForm;
