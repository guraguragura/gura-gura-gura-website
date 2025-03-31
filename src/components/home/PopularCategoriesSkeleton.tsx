
import React from "react";

const PopularCategoriesSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-4 overflow-hidden">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="flex-none w-1/4">
          <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-300 mb-3"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCategoriesSkeleton;
