
import React from "react";

const stats = [
  { number: "1M+", label: "Monthly Visitors" },
  { number: "5,000+", label: "Active Sellers" },
  { number: "50,000+", label: "Products" },
  { number: "98%", label: "Customer Satisfaction" },
];

export default function StatisticsBanner() {
  return (
    <section className="bg-blue-50 -mx-8 px-8 py-10 rounded-xl">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div className="text-center px-4" key={stat.label}>
              <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
