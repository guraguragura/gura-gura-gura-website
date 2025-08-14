
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
              <h3 className="text-2xl font-bold mb-4">Benefits for Small Sellers & Artisans</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Instant Online Presence</strong> – Get your products on a professional e-commerce platform without needing your own website.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>No Tech Skills Needed</strong> – We handle photography, listings, payments, and delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Low Entry Barrier</strong> – Start selling with small quantities; scale up as demand grows.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Access to More Customers</strong> – Reach buyers across Kigali and beyond.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Fair & Transparent Commissions</strong> – Only pay a percentage when you make sales.</span>
                </li>
              </ul>
              <Button className="mt-6">Get Started</Button>
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
              <h3 className="text-2xl font-bold mb-4">Benefits for Medium Businesses</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>New Sales Channel</strong> – Expand beyond physical stores into online retail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Full Logistics Support</strong> – We store, package, and deliver your products.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Marketing Push</strong> – Benefit from Gura's advertising, social media, and email campaigns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Real-Time Stock & Sales Tracking</strong> – Know exactly what's selling and what's in stock.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Flexible Partnership Terms</strong> – We adapt to your business needs and seasonal demand.</span>
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
              <h3 className="text-2xl font-bold mb-4">Benefits for Large Enterprises</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Nationwide Reach</strong> – Get your products in front of thousands of Rwandan customers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Efficient Warehousing & Fulfilment</strong> – Reduce operational costs by outsourcing storage and delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Brand Visibility</strong> – Featured placement in our marketplace and promotions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Data-Driven Insights</strong> – Access detailed reports on sales trends, customer behavior, and product performance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">✓</div>
                  <span><strong>Streamlined Operations</strong> – We integrate your product lines seamlessly into our sales, logistics, and customer service system.</span>
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
