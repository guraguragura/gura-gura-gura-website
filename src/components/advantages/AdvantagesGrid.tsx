
import React from 'react';
import AdvantageCard from './AdvantageCard';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  Shield, 
  CreditCard, 
  HeartHandshake, 
  Smile, 
  Users 
} from 'lucide-react';

const AdvantagesGrid = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Most orders in Kigali are delivered within 24 hours, and nationwide delivery is available within 2-3 days."
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "All products on our platform undergo rigorous quality checks to ensure they meet our high standards."
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Enjoy free shipping on orders over 30,000 RWF in Kigali and 50,000 RWF nationwide."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Our platform uses the latest security measures to protect your personal and payment information."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Pay with mobile money, credit/debit cards, or choose our convenient cash on delivery option."
    },
    {
      icon: HeartHandshake,
      title: "Support Local Businesses",
      description: "By shopping with Gura, you're supporting thousands of local Rwandan businesses and entrepreneurs."
    },
    {
      icon: Smile,
      title: "Easy Returns",
      description: "Not satisfied with your purchase? Return it within 7 days for a full refund or exchange."
    },
    {
      icon: Users,
      title: "Dedicated Customer Support",
      description: "Our friendly customer service team is available 24/7 to assist you with any questions or concerns."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">All the Benefits of Shopping with Gura</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advantages.map((advantage, index) => (
          <AdvantageCard 
            key={index}
            icon={advantage.icon}
            title={advantage.title}
            description={advantage.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesGrid;
