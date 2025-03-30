
import React from "react";
import { Slider } from "@/components/ui/slider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PriceFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

const PriceFilter = ({ priceRange, setPriceRange }: PriceFilterProps) => {
  return (
    <AccordionItem value="price" className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">Filter by Price</AccordionTrigger>
      <AccordionContent>
        <div className="mt-4 px-2">
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex justify-between mt-2">
            <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
              ${priceRange[0]}
            </div>
            <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
              ${priceRange[1]}
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white w-full rounded-md py-2 text-sm">
            Filter
          </button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
