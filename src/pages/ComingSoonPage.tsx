import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#7EC4CF] to-[#6BB1BD] px-4 font-sans">
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <Link to="/" className="inline-block">
          <img 
            src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
            alt="Gura Logo" 
            className="h-16 mx-auto"
          />
        </Link>
        
        <div className="relative">
          <img 
            src="/lovable-uploads/1e19e6db-d806-4982-a3e1-2f8f6e0119da.png"
            alt="Gura Delivery" 
            className="w-64 md:w-80 mx-auto my-8 rounded-lg shadow-xl"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#4A9B55]/90 text-white px-6 py-2 rounded-full backdrop-blur-sm">
            Coming Soon
          </div>
        </div>
        
        <p className="text-xl text-white mt-8 font-medium font-sans">
          We're gearing up to revolutionize delivery in your area.
          <br />Stay tuned for something amazing!
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-sans"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#4A9B55] hover:bg-[#4A9B55]/90 text-white flex items-center gap-2 font-sans"
            >
              <Mail className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComingSoonPage;
