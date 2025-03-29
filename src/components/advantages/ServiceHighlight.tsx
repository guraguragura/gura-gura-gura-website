
import React from 'react';

interface ServiceHighlightProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const ServiceHighlight = ({ icon: Icon, title, description }: ServiceHighlightProps) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default ServiceHighlight;
