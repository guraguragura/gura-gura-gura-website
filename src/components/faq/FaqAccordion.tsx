
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultValue?: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ 
  items,
  defaultValue 
}) => {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
