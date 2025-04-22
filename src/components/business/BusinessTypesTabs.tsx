import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const BusinessTypesTabs = () => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Solutions for All Business Types</h2>
        <p className="text-gray-600 mt-2">
          Tailored offerings for different business needs
        </p>
      </div>

      <Tabs defaultValue="small" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="small">Small Business</TabsTrigger>
          <TabsTrigger value="medium">Medium Enterprise</TabsTrigger>
          <TabsTrigger value="large">Large Corporation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="small" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Small Business Solutions</h3>
              <p className="text-gray-700 mb-4">
                Affordable procurement solutions designed to help small businesses thrive without the overhead.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Access to business pricing without minimum order requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Simple monthly invoicing to manage cash flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Basic reporting and order management tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Free delivery for orders above 100,000 RWF</span>
                </li>
              </ul>
              <Button className="mt-6">Get Started</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/8b872c64-6416-41e9-bcd6-fa615c17062e.png" 
                alt="Small Business Solutions" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="medium" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Medium Enterprise Solutions</h3>
              <p className="text-gray-700 mb-4">
                Comprehensive procurement solutions for growing businesses with more complex needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Volume discounts and competitive business pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Dedicated account manager for personalized service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Advanced reporting and approval workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Flexible payment terms up to 30 days</span>
                </li>
              </ul>
              <Button className="mt-6">Contact Sales</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/be761724-f6f8-44e2-9203-2eb518479226.png" 
                alt="Medium Enterprise Solutions Cityscape" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="large" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Large Corporation Solutions</h3>
              <p className="text-gray-700 mb-4">
                Enterprise-grade procurement solutions with maximum customization and support.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Custom pricing with maximum volume discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Full procurement integration with your ERP systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Comprehensive analytics and spending controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Customizable payment terms up to 60 days</span>
                </li>
              </ul>
              <Button className="mt-6">Schedule Consultation</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/97209c9f-86e9-41e3-ae8c-ebfcabf91a15.png" 
                alt="Large Corporation Solutions" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default BusinessTypesTabs;
