import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 animate-fade-in">
      <Button
        onClick={() => navigate('/products')}
        size="lg"
        className="w-full shadow-lg"
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Shop Now
      </Button>
    </div>
  );
};

export default StickyCTA;
