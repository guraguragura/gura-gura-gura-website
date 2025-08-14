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
              <h3 className="text-2xl font-bold mb-4">Benefits for Small Businesses</h3>
              <p className="text-gray-700 mb-4">
                Essential solutions to help small businesses grow with competitive pricing and flexible terms.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Access to Wholesale Pricing</strong> – Buy in bulk at discounted rates, helping you increase profit margins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>One-Stop Shop</strong> – Source multiple product categories from a single trusted supplier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Flexible Order Sizes</strong> – Start with smaller bulk orders and scale up as demand grows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Reliable Delivery</strong> – Get your stock delivered quickly and safely to your business location.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>No Hidden Costs</strong> – Transparent pricing with no surprise fees.</span>
                </li>
              </ul>
              <Button className="mt-6">Get Started</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/1d57fa24-4d67-462b-8728-977582dff3c4.png" 
                alt="Small Business Packaging and Shipping" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="medium" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Benefits for Medium Businesses</h3>
              <p className="text-gray-700 mb-4">
                Advanced solutions for growing businesses that need reliable supply chains and dedicated support.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Stable Supply Chain</strong> – Consistent stock availability so you can meet customer demand year-round.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Custom Bulk Packages</strong> – Tailored deals for your business needs and seasonal sales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Credit Terms Available</strong> – For trusted partners, flexible payment terms to manage cash flow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Dedicated Account Support</strong> – A Gura representative to handle your orders and questions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Product Variety</strong> – From electronics to home goods, access a wide range in one place.</span>
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
              <h3 className="text-2xl font-bold mb-4">Benefits for Large Enterprises</h3>
              <p className="text-gray-700 mb-4">
                Enterprise-grade solutions with strategic partnerships and data-driven insights for maximum efficiency.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Volume-Based Discounts</strong> – Bigger orders mean greater savings, helping reduce procurement costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Priority Fulfilment</strong> – Large orders processed and delivered on an accelerated schedule.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Data-Driven Purchasing</strong> – Access to purchase history and product performance insights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Custom Logistics Solutions</strong> – Special delivery schedules, warehousing options, and packaging tailored to your needs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Strategic Partnership Opportunities</strong> – Co-marketing campaigns and exclusive product lines for your retail network.</span>
                </li>
              </ul>
              <Button className="mt-6">Schedule Consultation</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/e53b7e82-761b-4302-88a9-4391941e4d93.png" 
                alt="Large Corporation Shipping Containers" 
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
