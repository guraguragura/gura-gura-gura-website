
import React from "react";

const steps = [
  {
    number: "1",
    title: "Get in Touch",
    description: "Email us at sales@gura.rw to start the conversation about partnering with us."
  },
  {
    number: "2",
    title: "Agree on the Terms",
    description: "We'll discuss percentages, pricing, and storage arrangements that work for your business."
  },
  {
    number: "3",
    title: "Ship Your Products",
    description: "Send your stock to our Kigali warehouse where we'll store it safely and securely."
  },
  {
    number: "4",
    title: "We Sell for You",
    description: "We handle listing, sales, payments, and delivery while you focus on your business."
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-gray-600 mt-2">
          Simple steps to start partnering with Gura
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
