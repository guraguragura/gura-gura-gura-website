
import React from "react";

const CommunitySection = () => (
  <div>
    <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1526551038968-efbc38a6a167"
        alt="Community Commitment"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl text-white font-bold text-center">
          Our Commitment To The Community
        </h2>
      </div>
    </div>
    <p className="text-gray-600 text-center mb-8">
      At Gura, we believe in giving back to the community. We are actively involved in various initiatives to support local communities and promote sustainable practices.
    </p>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
          <span>1</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
        <p className="text-gray-600">
          We partner with local organizations to support educational programs, healthcare initiatives, and community development projects.
        </p>
      </div>
      <div className="text-center">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
          <span>2</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Customer Education</h3>
        <p className="text-gray-600">
          New to online shopping? We've got you covered! Our easy-to-use platform guides you step-by-step through placing your order, making payments, and tracking your delivery.
        </p>
      </div>
      <div className="text-center">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
          <span>3</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Empowerment</h3>
        <p className="text-gray-600">
          We support local artisans and small businesses by providing them with a platform to reach a wider audience and grow their businesses.
        </p>
      </div>
    </div>
  </div>
);

export default CommunitySection;
