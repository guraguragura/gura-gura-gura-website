
import React from 'react';
import ServiceHighlight from './ServiceHighlight';
import { PhoneCall, RefreshCw, Truck } from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: PhoneCall,
      title: "Customer Service",
      description: "Our professional customer service team is ready to answer all your questions 24/7."
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Changed your mind? You can return most products within 7 days for a full refund."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We offer same-day delivery in Kigali and nationwide delivery within 2-3 days."
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <ServiceHighlight 
            key={i}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesOverview;
