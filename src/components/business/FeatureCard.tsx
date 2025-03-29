
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="h-full border-2 border-transparent hover:border-blue-100 transition-all duration-300 hover:shadow-lg">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="mb-4 bg-blue-50 p-3 rounded-full w-14 h-14 flex items-center justify-center">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
