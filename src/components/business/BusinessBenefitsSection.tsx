
import React from 'react';
import { DollarSign, Briefcase, ShieldCheck, CalendarClock } from 'lucide-react';

const BusinessBenefitsSection = () => {
  const businessBenefits = [
    {
      title: "Time & Cost Savings",
      description: "Centralize your procurement through Gura and save valuable time and resources. Our competitive bulk pricing ensures you get the best value.",
      icon: DollarSign
    },
    {
      title: "Streamlined Procurement",
      description: "Our business portal provides advanced tools for order management, approval workflows, and detailed reporting for better spend visibility.",
      icon: Briefcase
    },
    {
      title: "Quality Assurance",
      description: "All products on our platform undergo rigorous quality checks, ensuring your business receives only the best supplies and materials.",
      icon: ShieldCheck
    },
    {
      title: "Customized Catalog",
      description: "Work with our business team to create a customized catalog of frequently ordered items with negotiated pricing specifically for your business.",
      icon: CalendarClock
    }
  ];

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Business Benefits</h2>
        <p className="text-gray-600 mt-2">
          How Gura adds value to your business operations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {businessBenefits.map((benefit, index) => (
          <div key={index} className="flex gap-6 p-6 bg-gray-50 rounded-xl">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessBenefitsSection;
