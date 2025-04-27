
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <Link to="/" className="inline-block">
          <img 
            src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
            alt="Gura Logo" 
            className="h-16 mx-auto mb-8"
          />
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Coming Soon
        </h1>
        
        <p className="text-xl text-gray-600 mt-4">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        <div className="flex items-center justify-center gap-2 text-brand-teal">
          <Clock className="h-6 w-6" />
          <span className="text-lg">Launch Countdown</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/">
              Return Home
            </Link>
          </Button>
          <Button asChild>
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
