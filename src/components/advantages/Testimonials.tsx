
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Emmanuel K.",
            location: "Kigali",
            rating: 5,
            quote: "Gura has completely changed how I shop. Fast delivery, great prices, and the customer service is exceptional!"
          },
          {
            name: "Diane M.",
            location: "Musanze",
            rating: 5,
            quote: "I love that I can now get products from Kigali delivered to my doorstep in Musanze within just 2 days. Amazing service!"
          },
          {
            name: "Patrick R.",
            location: "Huye",
            rating: 5,
            quote: "As a small business owner, selling on Gura has helped me reach customers across Rwanda that I never could before."
          }
        ].map((testimonial, index) => (
          <Card key={index} className="bg-white relative">
            <CardContent className="p-6">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="italic mb-4 text-gray-700">"{testimonial.quote}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-gray-600 text-sm">{testimonial.location}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/shop">
          <Button className="group">
            Start Shopping Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
