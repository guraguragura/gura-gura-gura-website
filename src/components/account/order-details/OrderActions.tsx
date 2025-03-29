
import React from 'react';
import { Button } from '@/components/ui/button';

interface OrderActionsProps {
  isOrderCanceled: boolean;
  isOrderDelivered: boolean;
  onReturnOrder: () => void;
  onCancelOrder: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
  isOrderCanceled,
  isOrderDelivered,
  onReturnOrder,
  onCancelOrder
}) => {
  return (
    <div className="flex justify-end">
      <Button variant="outline" className="mr-2">
        Need Help?
      </Button>
      {!isOrderCanceled && (
        isOrderDelivered ? (
          <Button 
            onClick={onReturnOrder}
            className="bg-[#F2FCE2] text-green-700 hover:bg-green-100 border border-green-200"
          >
            Return Order
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={onCancelOrder}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Cancel Order
          </Button>
        )
      )}
    </div>
  );
};
