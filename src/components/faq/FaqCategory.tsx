
import React from 'react';
import FaqAccordion, { FaqItem } from './FaqAccordion';

interface FaqCategoryProps {
  title: string;
  description?: string;
  items: FaqItem[];
}

const FaqCategory: React.FC<FaqCategoryProps> = ({ 
  title, 
  description, 
  items 
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      <FaqAccordion items={items} defaultValue="item-0" />
    </div>
  );
};

export default FaqCategory;
