import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HeroSkeleton = () => {
  return (
    <section className="py-1 md:py-4">
      <div className="w-full px-2 md:px-4 mx-auto">
        <Skeleton className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-lg" />
      </div>
    </section>
  );
};

export default HeroSkeleton;
