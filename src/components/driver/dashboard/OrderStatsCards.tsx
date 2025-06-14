
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Truck } from 'lucide-react';

interface OrderStatsCardsProps {
  availableCount: number;
  assignedCount: number;
}

const OrderStatsCards = ({ availableCount, assignedCount }: OrderStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{availableCount}</div>
          <div className="text-sm text-gray-600">Available</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{assignedCount}</div>
          <div className="text-sm text-gray-600">Assigned</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatsCards;
