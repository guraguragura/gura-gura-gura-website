
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PopularCategoriesSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-4 overflow-hidden">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="flex-none w-1/4">
          <div className="rounded-lg p-4 flex flex-col items-center">
            <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-md mb-3" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCategoriesSkeleton;
