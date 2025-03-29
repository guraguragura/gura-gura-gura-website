
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Gura Business has transformed how we handle office supplies. Their bulk pricing and dedicated support save us time and money every month.",
      author: "Emmanuel N.",
      position: "Procurement Manager, Kigali Tech Hub"
    },
    {
      quote: "The customized catalog and flexible payment options make Gura the perfect partner for our hospitality business. Highly recommended!",
      author: "Claire M.",
      position: "Operations Director, Lakeside Resorts"
    },
    {
      quote: "We've reduced our procurement costs by 22% since switching to Gura Business. Their streamlined ordering system is exactly what we needed.",
      author: "Jean-Paul K.",
      position: "CFO, Rwanda Manufacturing Co."
    }
  ];

  return (
    <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">What Our Business Clients Say</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <p className="italic mb-6 text-gray-700">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.position}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
