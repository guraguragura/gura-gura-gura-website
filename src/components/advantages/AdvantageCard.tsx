
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AdvantageCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const AdvantageCard = ({ icon: Icon, title, description }: AdvantageCardProps) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-blue-100">
    <CardContent className="p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4 bg-blue-50 p-3 rounded-full">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default AdvantageCard;
