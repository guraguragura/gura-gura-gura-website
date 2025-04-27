
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#7EC4CF] to-[#6BB1BD] px-4">
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
        
        <p className="text-xl text-white mt-8 font-medium">
          We're gearing up to revolutionize delivery in your area.
          <br />Stay tuned for something amazing!
        </p>

        <div className="flex items-center justify-center gap-2 text-white/90">
          <Clock className="h-6 w-6" />
          <span className="text-lg">Launch Countdown</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Link to="/">
              Return Home
            </Link>
          </Button>
          <Button 
            asChild
            className="bg-[#4A9B55] hover:bg-[#4A9B55]/90 text-white"
          >
            <a href="mailto:contact@gura.com">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
