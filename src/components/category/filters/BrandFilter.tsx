
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RadioFilterItem from "./RadioFilterItem";

interface BrandOption {
  name: string;
  count: number;
}

interface BrandFilterProps {
  brands: BrandOption[];
  brandFilter: string | null;
  setBrandFilter: (value: string) => void;
}

const BrandFilter = ({ brands, brandFilter, setBrandFilter }: BrandFilterProps) => {
  return (
    <AccordionItem value="brand" className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">Filter by Brand</AccordionTrigger>
      <AccordionContent>
        <div className="mt-2 space-y-2">
          {brands.map((brand) => (
            <RadioFilterItem
              key={brand.name}
              id={`brand-${brand.name}`}
              name="brand"
              value={brand.name}
              checked={brandFilter === brand.name}
              onChange={() => setBrandFilter(brand.name)}
              count={brand.count}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BrandFilter;
