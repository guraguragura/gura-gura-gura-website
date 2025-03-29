
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface OrderNotFoundProps {
  onGoBack: () => void;
}

export const OrderNotFound: React.FC<OrderNotFoundProps> = ({ onGoBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onGoBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
      </div>
      <div className="border rounded-lg p-6 text-center py-12">
        <p className="text-gray-500">Order not found. The order may have been removed or the ID is incorrect.</p>
        <Button onClick={onGoBack} className="mt-4">View All Orders</Button>
      </div>
    </div>
  );
};
