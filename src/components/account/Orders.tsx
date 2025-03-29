
import React from 'react';

export const Orders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-gray-500 mt-1">View and track your orders</p>
      </div>
      
      <div className="border rounded-lg p-6 text-center py-12">
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    </div>
  );
};
