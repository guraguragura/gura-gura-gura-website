
import React from "react";

const steps = [
  {
    number: "1",
    title: "Apply to Sell",
    description: "Fill out our seller application with your business information and product categories you want to sell."
  },
  {
    number: "2",
    title: "Verification & Approval",
    description: "Our team will review your application, verify your business documents, and set up your seller account."
  },
  {
    number: "3",
    title: "Set Up Your Store",
    description: "Upload your products, set prices, and customize your seller profile with our easy-to-use tools."
  },
  {
    number: "4",
    title: "Start Selling",
    description: "Launch your store on Gura and start receiving orders from customers across Rwanda."
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How to Become a Gura Seller</h2>
        <p className="text-gray-600 mt-2">
          Simple steps to start selling on our platform
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-12">
        {steps.map(step => (
          <div className="flex flex-col md:flex-row items-start gap-4" key={step.number}>
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              {step.number}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
