
import React from "react";

const MissionSection = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="rounded-lg overflow-hidden h-80">
      <img
        src="/lovable-uploads/1d4104e3-b829-451d-a439-3c761b393137.png"
        alt="Gura Mission"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h2 className="text-3xl font-bold mb-4">
        Our <span className="text-blue-500">Mission</span>
      </h2>
      <p className="text-gray-600 mb-4">
        Our mission is to revolutionize the retail landscape in Rwanda by offering a convenient, reliable, and enjoyable online shopping experience. We strive to meet the diverse needs of our customers through a wide selection of products, competitive prices, and exceptional service.
      </p>
    </div>
  </div>
);

export default MissionSection;
