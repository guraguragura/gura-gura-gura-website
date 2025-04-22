
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Partnering with Gura has transformed our business. We've expanded from a small local shop to selling nationwide with minimal overhead.",
    author: "Marie C.",
    business: "Kigali Craft Collective"
  },
  {
    quote: "The seller dashboard makes it easy to manage inventory and track sales. Our revenue has increased by 40% since joining the Gura platform.",
    author: "Patrick N.",
    business: "Tech Essentials Rwanda"
  },
  {
    quote: "As a small producer, Gura has given us access to customers we could never reach before. Their seller support team is always ready to help.",
    author: "Diane M.",
    business: "Rwandan Spice Company"
  }
];

export default function TestimonialsSection() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Success Stories from Our Sellers</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <Card key={idx} className="bg-white">
            <CardContent className="p-6">
              <p className="italic mb-6 text-gray-700">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">{testimonial.business}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
