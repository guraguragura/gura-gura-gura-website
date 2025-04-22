
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function SellerTypesTabs() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Solutions for All Seller Types</h2>
        <p className="text-gray-600 mt-2">
          Whether you're a small artisan or a large manufacturer, we have the right tools for you
        </p>
      </div>

      <Tabs defaultValue="small" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="small">Small Sellers</TabsTrigger>
          <TabsTrigger value="medium">Medium Businesses</TabsTrigger>
          <TabsTrigger value="large">Large Enterprises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="small" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Small Sellers & Artisans</h3>
              <p className="text-gray-700 mb-4">
                Perfect for independent creators, small shops, and individual entrepreneurs looking to expand their reach.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Low commission rates and no monthly fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Simple product listing tools with step-by-step guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Optional fulfillment services if you can't handle shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Weekly payment processing</span>
                </li>
              </ul>
              <Button className="mt-6">Apply Now</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/5bc8b271-aa7d-4103-8681-58b3e69bf415.png" 
                alt="Small Sellers & Artisans" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="medium" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Medium Businesses</h3>
              <p className="text-gray-700 mb-4">
                Tailored for established businesses looking to expand their online presence and reach new customers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Competitive commission rates with volume discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Advanced inventory management and bulk uploading tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Featured placement opportunities and promotional support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Bi-weekly payment processing</span>
                </li>
              </ul>
              <Button className="mt-6">Contact Sales</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/8bb30b2b-7c22-4d70-99e4-285be1712bb4.png" 
                alt="Medium Businesses" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="large" className="p-6 bg-white rounded-lg shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Large Enterprises</h3>
              <p className="text-gray-700 mb-4">
                Enterprise solutions for manufacturers, distributors, and large retailers with extensive product catalogs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Lowest commission rates and customized fee structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>API integration for seamless inventory and order management</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Dedicated account manager and priority seller support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span>Weekly payment processing with custom options available</span>
                </li>
              </ul>
              <Button className="mt-6">Enterprise Solutions</Button>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 overflow-hidden">
              <img 
                src="/lovable-uploads/189d5b38-0cf3-4a56-9606-2caba74233ca.png" 
                alt="Large Enterprises" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
