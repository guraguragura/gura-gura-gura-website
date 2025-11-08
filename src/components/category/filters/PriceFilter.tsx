
import React from "react";
import { Slider } from "@/components/ui/slider";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCurrency } from "@/hooks/useCurrency";

interface PriceFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  minPrice: number;
  maxPrice: number;
}

const PriceFilter = ({ priceRange, setPriceRange, minPrice, maxPrice }: PriceFilterProps) => {
  const { formatPrice } = useCurrency();
  return (
    <AccordionItem value="price" className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">Filter by Price</AccordionTrigger>
      <AccordionContent>
        <div className="mt-4 px-2">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex justify-between mt-2">
            <div className="bg-muted rounded-md px-3 py-1 text-sm">
              {formatPrice(priceRange[0])}
            </div>
            <div className="bg-muted rounded-md px-3 py-1 text-sm">
              {formatPrice(priceRange[1])}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
