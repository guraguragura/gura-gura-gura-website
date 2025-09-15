
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';

const OfflineMessage = () => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Truck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">You're currently offline</p>
        <p className="text-sm text-gray-500 mt-1">Toggle availability to see available orders</p>
      </CardContent>
    </Card>
  );
};

export default OfflineMessage;
