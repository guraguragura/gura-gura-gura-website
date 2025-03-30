
import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RadioFilterItem from "./RadioFilterItem";

interface ColorOption {
  name: string;
  count: number;
}

interface ColorFilterProps {
  colors: ColorOption[];
  colorFilter: string | null;
  setColorFilter: (value: string) => void;
}

const ColorFilter = ({ colors, colorFilter, setColorFilter }: ColorFilterProps) => {
  return (
    <AccordionItem value="color" className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">Filter by Color</AccordionTrigger>
      <AccordionContent>
        <div className="mt-2 space-y-2">
          {colors.map((color) => (
            <RadioFilterItem
              key={color.name}
              id={`color-${color.name}`}
              name="color"
              value={color.name}
              checked={colorFilter === color.name}
              onChange={() => setColorFilter(color.name)}
              count={color.count}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ColorFilter;
