
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, Shield, CreditCard, HeartHandshake, Smile, Users } from 'lucide-react';

const AdvantageCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4 bg-blue-50 p-3 rounded-full">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const AdvantagesPage = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Most orders in Kigali are delivered within 24 hours, and nationwide delivery is available within 2-3 days."
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "All products on our platform undergo rigorous quality checks to ensure they meet our high standards."
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Enjoy free shipping on orders over 30,000 RWF in Kigali and 50,000 RWF nationwide."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Our platform uses the latest security measures to protect your personal and payment information."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Pay with mobile money, credit/debit cards, or choose our convenient cash on delivery option."
    },
    {
      icon: HeartHandshake,
      title: "Support Local Businesses",
      description: "By shopping with Gura, you're supporting thousands of local Rwandan businesses and entrepreneurs."
    },
    {
      icon: Smile,
      title: "Easy Returns",
      description: "Not satisfied with your purchase? Return it within 7 days for a full refund or exchange."
    },
    {
      icon: Users,
      title: "Dedicated Customer Support",
      description: "Our friendly customer service team is available 24/7 to assist you with any questions or concerns."
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Why Choose Gura?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the benefits that make Gura the preferred e-commerce platform for thousands of Rwandans.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard 
              key={index}
              icon={advantage.icon}
              title={advantage.title}
              description={advantage.description}
            />
          ))}
        </div>

        {/* Customer Testimonials */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Emmanuel K.",
                location: "Kigali",
                quote: "Gura has completely changed how I shop. Fast delivery, great prices, and the customer service is exceptional!"
              },
              {
                name: "Diane M.",
                location: "Musanze",
                quote: "I love that I can now get products from Kigali delivered to my doorstep in Musanze within just 2 days. Amazing service!"
              },
              {
                name: "Patrick R.",
                location: "Huye",
                quote: "As a small business owner, selling on Gura has helped me reach customers across Rwanda that I never could before."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 p-8 rounded-lg text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to experience the Gura advantage?</h2>
          <p className="text-gray-700 mb-6">Join the thousands of satisfied customers who shop with Gura every day.</p>
          <div className="flex justify-center gap-4">
            <a href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Start Shopping
            </a>
            <a href="/app" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Download Our App
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AdvantagesPage;
