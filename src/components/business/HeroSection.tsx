
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 container mx-auto px-4 py-16 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Gura for Business</h1>
        <p className="text-xl mb-8">
          Streamline your business procurement with specialized solutions tailored for companies of all sizes. Save time, reduce costs, and focus on what matters most – growing your business.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link to="#contact">Contact Our Business Team</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
