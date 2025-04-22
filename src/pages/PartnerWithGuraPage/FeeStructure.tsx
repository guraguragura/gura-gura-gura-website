
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const feeData = [
  {
    category: "Fashion & Accessories",
    commission: "15%",
    notes: "Free product photography available"
  },
  {
    category: "Electronics & Appliances",
    commission: "10%",
    notes: "Volume discounts available"
  },
  {
    category: "Home & Garden",
    commission: "12%",
    notes: "Includes customer service support"
  },
  {
    category: "Food & Groceries",
    commission: "8%",
    notes: "Special handling for perishables"
  },
  {
    category: "Health & Beauty",
    commission: "15%",
    notes: "Certification assistance available"
  },
  {
    category: "Handcrafted Items",
    commission: "12%",
    notes: "Artisan support program"
  }
];

export default function FeeStructure() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Transparent Fee Structure</h2>
        <p className="text-gray-600 mt-2">
          Simple and fair commission rates with no hidden charges
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {feeData.map((fee, i) => (
          <Card key={i} className="border-2 border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">{fee.category}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{fee.commission}</div>
              <p className="text-gray-600 text-sm">{fee.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-gray-600 mt-6">
        * Additional fees may apply for premium placements and promotional features
      </p>
    </section>
  );
}
