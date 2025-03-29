
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to streamline your business procurement?</h2>
      <p className="text-gray-600 mb-6">
        Join the hundreds of businesses that trust Gura for their procurement needs.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg">Create Business Account</Button>
        <Button variant="outline" size="lg">Schedule Demo</Button>
      </div>
    </section>
  );
};

export default CTASection;
