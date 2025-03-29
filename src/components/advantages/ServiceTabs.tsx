
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import StepCard from './StepCard';

const ServiceTabs = () => {
  return (
    <Tabs defaultValue="shopping" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="shopping">Shopping Made Easy</TabsTrigger>
        <TabsTrigger value="delivery">Reliable Delivery</TabsTrigger>
        <TabsTrigger value="service">Customer Service</TabsTrigger>
      </TabsList>
      <TabsContent value="shopping" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shopping Made Easy</h2>
            <p className="text-gray-700 mb-4">
              With thousands of products across dozens of categories, finding what you need is easy on Gura. 
              Our user-friendly website and mobile app make browsing and purchasing a breeze.
            </p>
            <div className="space-y-4 mt-6">
              <StepCard 
                number="1" 
                title="Browse Products" 
                description="Search our vast catalog or browse by category to find what you're looking for." 
              />
              <StepCard 
                number="2" 
                title="Add to Cart" 
                description="Select your items, choose quantities, and add them to your shopping cart." 
              />
              <StepCard 
                number="3" 
                title="Checkout" 
                description="Enter your delivery details and payment information to complete your purchase." 
              />
            </div>
          </div>
          <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/4de8f3ef-2f9c-4028-b855-f7d4a316dabf.png" 
              alt="Shopping Experience" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="delivery" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/61870ac8-67b1-4faf-9fa6-e40f60010b9d.png" 
              alt="Delivery Service" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4">Fast & Reliable Delivery</h2>
            <p className="text-gray-700 mb-4">
              We understand that getting your purchases quickly is important. 
              That's why we've built one of Rwanda's most efficient delivery networks.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Same-day delivery available in Kigali for orders placed before 12pm</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">2-3 day nationwide delivery to all provinces</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Track your order in real-time through our app</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Free shipping on orders over 30,000 RWF in Kigali</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="service" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Customer Service Excellence</h2>
            <p className="text-gray-700 mb-4">
              Our friendly customer service team is available 24/7 to assist you with any questions or concerns.
              We're committed to ensuring your shopping experience is smooth and enjoyable.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Ways to Contact Us:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded">
                    <PhoneCall className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Call us: +250 788 123 456</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </div>
                  <span>Live Chat: Available on our website and app</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <span>Email: support@gura.rw</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/9f9f6f6c-f423-47c6-8964-326b064c2fd8.png" 
              alt="Customer Service" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ServiceTabs;
