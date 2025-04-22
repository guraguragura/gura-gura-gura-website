
import React from "react";
import { ChartBar, Package, Truck, BadgePercent } from "lucide-react";

const sellerTools = [
  {
    title: "Seller Dashboard",
    description: "Comprehensive analytics and sales management tools to track performance and growth opportunities.",
    icon: ChartBar
  },
  {
    title: "Inventory Management",
    description: "Easy-to-use tools to manage your product listings, stock levels, and pricing in real-time.",
    icon: Package
  },
  {
    title: "Order Processing",
    description: "Streamlined order fulfillment with notifications, shipping label generation, and tracking integration.",
    icon: Truck
  },
  {
    title: "Promotional Tools",
    description: "Create discounts, bundle offers, and flash sales to boost your visibility and sales on the platform.",
    icon: BadgePercent
  }
];

export default function SellerTools() {
  return (
    <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Powerful Tools for Sellers</h2>
        <p className="text-gray-600 mt-2">
          Everything you need to manage and grow your business on Gura
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sellerTools.map((tool, idx) => (
          <div key={idx} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <tool.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
