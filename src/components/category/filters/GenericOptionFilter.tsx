import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RadioFilterItem from "./RadioFilterItem";

interface OptionValue {
  value: string;
  count: number;
}

interface GenericOptionFilterProps {
  title: string;
  filterKey: string;
  options: OptionValue[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;
}

const GenericOptionFilter = ({ 
  title, 
  filterKey, 
  options, 
  selectedValue, 
  onChange 
}: GenericOptionFilterProps) => {
  // Don't render if no options
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <AccordionItem value={filterKey} className="border-0">
      <AccordionTrigger className="text-lg font-semibold py-0">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <RadioFilterItem
              key={option.value}
              id={`${filterKey}-${option.value}`}
              name={filterKey}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(selectedValue === option.value ? null : option.value)}
              count={option.count}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default GenericOptionFilter;
