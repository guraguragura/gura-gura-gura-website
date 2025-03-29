
import React from 'react';
import { Briefcase, Headset, DollarSign, Truck } from 'lucide-react';
import FeatureCard from './FeatureCard';

const KeyFeaturesSection = () => {
  const businessFeatures = [
    {
      icon: Briefcase,
      title: "Efficient & Affordable Solutions",
      description: "Access bulk pricing and specialized business catalogs with competitive rates designed specifically for business needs."
    },
    {
      icon: Headset,
      title: "Dedicated Business Support",
      description: "Get priority assistance from our specialized business account managers to handle all your procurement needs."
    },
    {
      icon: DollarSign,
      title: "Flexible Payment Options",
      description: "Benefit from invoice-based payments, credit terms, and customized payment schedules to match your cash flow."
    },
    {
      icon: Truck,
      title: "Seamless Logistics & Delivery",
      description: "Enjoy prioritized shipping, scheduled deliveries, and specialized handling for your business orders."
    }
  ];

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose Gura for Your Business?</h2>
        <p className="text-xl text-gray-600 mt-2">
          Discover the advantages that make Gura the preferred procurement partner for businesses across Rwanda
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
