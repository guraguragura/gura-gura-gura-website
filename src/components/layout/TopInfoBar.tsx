
import React from "react";
import { Link } from "react-router-dom";
import { TruckIcon, PhoneIcon } from "lucide-react";

const TopInfoBar = () => {
  return (
    <div className="bg-blue-600 text-white py-2 text-sm">
      <div className="mx-auto w-[80%] px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <TruckIcon className="h-4 w-4 mr-2" />
            <p>Free delivery on orders over ¥30,000</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>Customer Service</span>
            </div>
            <Link to="/app" className="hover:underline">
              Download the Gura App
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
