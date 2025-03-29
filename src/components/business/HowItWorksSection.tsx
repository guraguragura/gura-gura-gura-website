
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">How Gura Business Works</h2>
        <p className="text-gray-600 mt-2">
          Our simple process gets your business up and running quickly
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Register",
              description: "Create a free business account with your company details"
            },
            {
              step: "2",
              title: "Customize",
              description: "Work with our team to set up your business catalog and payment terms"
            },
            {
              step: "3",
              title: "Order",
              description: "Start placing orders with special business pricing and benefits"
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
