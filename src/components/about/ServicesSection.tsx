
import React from "react";
import { ShoppingCart, Shield, Clock, Users, Heart } from "lucide-react";

const ServicesSection = () => (
  <div>
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-4">Our Services</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        We are committed to providing a seamless shopping experience through our comprehensive range of services:
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="border-l-4 border-blue-500 pl-4">
        <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <ShoppingCart className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Easy Shopping</h3>
        <p className="text-gray-600">
          Our intuitive website and mobile app make it easy to browse, search, and purchase products.
        </p>
      </div>
      <div className="border-l-4 border-blue-500 pl-4">
        <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
        <p className="text-gray-600">
          We offer multiple secure payment options, including credit/debit cards, mobile money, and bank transfers.
        </p>
      </div>
      <div className="border-l-4 border-blue-500 pl-4">
        <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
        <p className="text-gray-600">
          We offer fast and reliable delivery services across Rwanda, with real-time tracking options.
        </p>
      </div>
      <div className="border-l-4 border-blue-500 pl-4">
        <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Users className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Customer Support</h3>
        <p className="text-gray-600">
          Our dedicated customer support team is available to assist you with any questions or issues. We are committed to resolving.
        </p>
      </div>
      <div className="border-l-4 border-blue-500 pl-4">
        <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <Heart className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Returns & Refunds</h3>
        <p className="text-gray-600">
          We offer a hassle-free returns policy, allowing you to return most new, unopened items within 30 days of delivery for a full refund.
        </p>
      </div>
    </div>
  </div>
);

export default ServicesSection;
