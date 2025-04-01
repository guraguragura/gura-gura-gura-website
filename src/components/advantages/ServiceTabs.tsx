
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, Briefcase, Smartphone, Headset, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ServiceTabs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      id: "fast",
      icon: Truck,
      title: "Lightning-Fast Delivery",
      description: "Experience the quickest delivery times in Rwanda. Order today, receive tomorrow! We offer same-day delivery in Kigali and nationwide delivery within 2-3 days.",
      points: [
        "Same-day delivery in Kigali",
        "Nationwide delivery within 2-3 days",
        "Real-time tracking of your orders",
        "Scheduled delivery options available"
      ],
      cta: "See Delivery Areas"
    },
    {
      id: "secure",
      icon: ShieldCheck,
      title: "Secure Payment Guarantee",
      description: "Shop with confidence knowing every transaction is encrypted and protected. We support multiple secure payment methods.",
      points: [
        "End-to-end encryption for all transactions",
        "Multiple payment options including mobile money",
        "Zero-liability fraud protection",
        "Secure checkout process"
      ],
      cta: "Learn About Security"
    },
    {
      id: "business",
      icon: Briefcase,
      title: "Solutions for Businesses",
      description: "Specialized services and pricing for businesses of all sizes. Streamline your procurement process.",
      points: [
        "Bulk ordering discounts",
        "Dedicated business account managers",
        "Customized invoicing options",
        "Special B2B pricing models"
      ],
      cta: "Business Solutions"
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Gura Mobile App",
      description: "Shop on the go with our intuitive mobile app. Available on iOS and Android.",
      points: [
        "Quick and easy mobile shopping",
        "Exclusive app-only deals",
        "Push notifications for order updates",
        "Simplified checkout process"
      ],
      cta: "Download the App"
    },
    {
      id: "support",
      icon: Headset,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions.",
      points: [
        "Live chat available 24/7",
        "Phone support in multiple languages",
        "Rapid email response times",
        "Comprehensive knowledge base"
      ],
      cta: "Contact Support"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-blue-50 to-white rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Premium Services For Every Customer</h2>
        
        <Tabs defaultValue="fast" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-blue-50/70 p-1">
            {services.map(service => (
              <TabsTrigger 
                key={service.id}
                value={service.id}
                className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-white"
              >
                <service.icon className="h-5 w-5" />
                <span className="text-sm hidden md:block">{service.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {services.map(service => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 p-2 rounded-full mb-4">
                          <div className="bg-white p-2 rounded-full">
                            <service.icon className="h-5 w-5" />
                          </div>
                          <span className="pr-2 font-medium">Gura Advantage</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          {service.cta}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="md:w-1/2">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-medium mb-4">Key Benefits</h4>
                          <ul className="space-y-3">
                            {service.points.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs font-bold">{index + 1}</span>
                                </div>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceTabs;
