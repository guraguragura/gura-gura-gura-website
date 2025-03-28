
import React from "react";
import { Link } from "react-router-dom";

const TopInfoBar = () => {
  return (
    <div className="bg-gray-100 py-2 text-sm">
      <div className="mx-auto w-[60%] px-4"> {/* Updated to 60% width (20% margin on each side) */}
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Free delivery above 30k FW</p>
          <Link to="/app" className="text-gray-700 hover:text-black">
            Download the Gura App
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;
