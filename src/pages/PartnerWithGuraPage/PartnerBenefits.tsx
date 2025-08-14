
import React from "react";
import { Building, Users, ChartBar, Megaphone, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const partnerBenefits = [
  {
    icon: Building,
    title: "Full E-commerce Management",
    description: "We take care of product listings, customer service, and payments so you can focus on your business."
  },
  {
    icon: Users,
    title: "Secure Storage",
    description: "Your products are stored safely in our warehouse with proper inventory management and security."
  },
  {
    icon: ChartBar,
    title: "Nationwide Delivery",
    description: "We ensure fast, reliable delivery to customers throughout Rwanda with our established logistics network."
  },
  {
    icon: Megaphone,
    title: "Marketing Boost",
    description: "Your products are featured in our marketing campaigns and promotional activities to maximize visibility."
  },
  {
    icon: DollarSign,
    title: "Transparent Reporting",
    description: "Regular updates on sales and inventory with detailed reporting so you're always informed about your business."
  }
];

export default function PartnerBenefits() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Partner with Us?</h2>
        <p className="text-xl text-gray-600 mt-2">
          Discover the advantages of letting Gura handle your online sales completely
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerBenefits.map((benefit, idx) => (
          <Card key={idx} className="h-full border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 bg-blue-50 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                <benefit.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 flex-grow">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
