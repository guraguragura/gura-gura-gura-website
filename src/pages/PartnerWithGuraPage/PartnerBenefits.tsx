
import React from "react";
import { Building, Users, ChartBar, Megaphone, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const partnerBenefits = [
  {
    icon: Building,
    title: "Trusted & Recognized Brand",
    description: "Join Rwanda's leading e-commerce platform with a strong reputation for quality and reliability that customers trust."
  },
  {
    icon: Users,
    title: "Large & Growing Customer Base",
    description: "Gain immediate access to our extensive customer base across Rwanda, with thousands of daily active shoppers."
  },
  {
    icon: ChartBar,
    title: "Expand Your Reach",
    description: "Extend your market reach beyond your physical location to customers throughout Rwanda with our nationwide delivery network."
  },
  {
    icon: Megaphone,
    title: "Marketing & Visibility Support",
    description: "Benefit from our marketing campaigns, featured product placements, and promotions to increase your products' visibility."
  },
  {
    icon: DollarSign,
    title: "Secure Payments & Seller Support",
    description: "Receive timely payments with our secure payment processing and dedicated seller support team to help you succeed."
  }
];

export default function PartnerBenefits() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Sell on Gura?</h2>
        <p className="text-xl text-gray-600 mt-2">
          Discover the advantages that make Gura the preferred marketplace for thousands of sellers
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
