
import React from "react";

const VisionSection = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="order-2 md:order-1">
      <h2 className="text-3xl font-bold mb-4">
        Our <span className="text-blue-500">Vision</span>
      </h2>
      <p className="text-gray-600 mb-4">
        Our vision is to be the premier online shopping destination in Rwanda, recognized for our commitment to quality, innovation, and customer satisfaction. We aim to continuously evolve and expand our offerings to stay ahead of market trends and customer expectations.
      </p>
    </div>
    <div className="order-1 md:order-2 rounded-lg overflow-hidden h-80">
      <img
        src="/lovable-uploads/99aaf028-a794-4d40-a759-ec3226b6d4c2.png"
        alt="Gura Vision"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default VisionSection;
