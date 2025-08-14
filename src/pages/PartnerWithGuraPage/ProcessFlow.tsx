import React from "react";
import { Building, Warehouse, ShoppingCart, Truck } from "lucide-react";

const ProcessFlow = () => {
  const steps = [
    {
      icon: Building,
      title: "Partner",
      description: "You provide quality products"
    },
    {
      icon: Warehouse,
      title: "Gura Warehouse",
      description: "We store your products safely"
    },
    {
      icon: ShoppingCart,
      title: "Online Store",
      description: "We list and market your products"
    },
    {
      icon: Truck,
      title: "Customer Delivery",
      description: "We deliver to customers nationwide"
    }
  ];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Simple Process Flow</h2>
        <p className="text-xl text-gray-600 mt-2">
          From your products to happy customers - we handle everything in between
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-blue-300">
                  <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-l-blue-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures your products reach customers efficiently while you focus on what you do best - creating great products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;