
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-lg text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Ready to experience the Gura advantage?</h2>
      <p className="text-blue-100 mb-6">Join the thousands of satisfied customers who shop with Gura every day.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/shop">
          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Start Shopping
          </Button>
        </Link>
        <Link to="/app">
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
            Download Our App
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
