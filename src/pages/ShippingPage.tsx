
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, MapPin, AlertTriangle } from "lucide-react";

const ShippingPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Shipping and Delivery</h1>
        <Separator className="mb-8" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Truck className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-600">On all orders over RWF 30,000</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Clock className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Express Delivery</h3>
            <p className="text-gray-600">Same-day delivery in Kigali</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <MapPin className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nationwide Delivery</h3>
            <p className="text-gray-600">We deliver to all provinces in Rwanda</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <AlertTriangle className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Order Tracking</h3>
            <p className="text-gray-600">Track your package in real-time</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Delivery Times</h2>
            <p className="text-gray-700 mb-4">
              We strive to deliver your orders as quickly as possible. Estimated delivery times vary depending on your location:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Standard Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Express Delivery
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Kigali City</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1-2 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Same day (orders before 12pm)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Major Cities</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Next day</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Other Provinces</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">3-5 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 business days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Remote Areas</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5-7 business days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">3-5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Shipping Costs</h2>
            <p className="text-gray-700 mb-2">
              Shipping costs are calculated based on the delivery location and the size/weight of the items in your order:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Orders above RWF 30,000: <span className="font-semibold">Free standard delivery</span></li>
              <li>Orders under RWF 30,000: Shipping costs start from RWF 1,500</li>
              <li>Express delivery: Additional fee of RWF 3,000</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Tracking Your Order</h2>
            <p className="text-gray-700">
              Once your order is shipped, you will receive an email with a tracking number. You can use this number to track your order on our website or through our mobile app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Delivery Issues</h2>
            <p className="text-gray-700">
              If you experience any issues with your delivery, please contact our customer service team at <a href="mailto:support@gura.rw" className="text-brand-teal hover:underline">support@gura.rw</a> or call us at +250 788 123 456.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPage;
