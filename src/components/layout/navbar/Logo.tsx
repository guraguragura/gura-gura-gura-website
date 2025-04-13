
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Logo = () => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className={`flex items-center ${isMobile ? 'justify-center' : ''}`}>
      <img 
        src="/lovable-uploads/4bed48db-95ec-4822-b3dd-a6c0d4c214ba.png" 
        alt="Gura Logo" 
        className="h-10" 
      />
    </Link>
  );
};

export default Logo;
