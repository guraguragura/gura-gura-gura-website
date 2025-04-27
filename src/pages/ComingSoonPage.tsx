import React, { useState } from "react";
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
    <div className="min-h-screen flex items-center bg-white text-black font-sans">
      <div className="w-full grid md:grid-cols-2 min-h-[660px] items-center">
        <div className="px-8 space-y-6 max-w-xl mx-auto w-full">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
              alt="Gura Logo" 
              className="h-12 w-auto" 
            />
          </Link>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">
              Coming Soon
            </h1>
            <p className="text-lg text-gray-600">
              Local delivery, unleashed. Gura is coming.<br />
              Join the movement bringing your community together.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border-gray-200"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-brand-teal hover:bg-brand-teal/90 text-black flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500">SOCIAL</span>
            <div className="h-[1px] w-12 bg-gray-200" />
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-yellow-400">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-400">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-yellow-400">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-[660px] relative">
          <img 
            src="/lovable-uploads/7c04b772-82ad-4506-a4fa-d24aba808745.png"
            alt="Happy Customer with Shopping Bags" 
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
