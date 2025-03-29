import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, Briefcase, Smartphone, Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceHighlight from './ServiceHighlight';

const ServiceTabs = () => {
  return (
    <Tabs defaultValue="fast" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <TabsTrigger value="fast">Fast Delivery</TabsTrigger>
        <TabsTrigger value="secure">Secure Payments</TabsTrigger>
        <TabsTrigger value="business">Business Solutions</TabsTrigger>
        <TabsTrigger value="mobile">Mobile Access</TabsTrigger>
        <TabsTrigger value="support">24/7 Support</TabsTrigger>
      </TabsList>
      <div className="mt-8">
        <TabsContent value="fast">
          <ServiceHighlight
            icon={Truck}
            title="Lightning-Fast Delivery"
            description="Experience the quickest delivery times in Rwanda. Order today, receive tomorrow!"
          />
        </TabsContent>
        <TabsContent value="secure">
          <ServiceHighlight
            icon={ShieldCheck}
            title="Secure Payment Guarantee"
            description="Shop with confidence knowing every transaction is encrypted and protected."
          />
        </TabsContent>
        <TabsContent value="business">
          <ServiceHighlight
            icon={Briefcase}
            title="Solutions for Businesses"
            description="Specialized services and pricing for businesses of all sizes. Streamline your procurement process."
          />
        </TabsContent>
        <TabsContent value="mobile">
          <ServiceHighlight
            icon={Smartphone}
            title="Gura Mobile App"
            description="Shop on the go with our intuitive mobile app. Available on iOS and Android."
          />
        </TabsContent>
        <TabsContent value="support">
          <ServiceHighlight
            icon={Headset}
            title="24/7 Customer Support"
            description="Our dedicated support team is available around the clock to assist you with any questions."
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ServiceTabs;
