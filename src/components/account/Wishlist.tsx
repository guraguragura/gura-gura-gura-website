
import React from 'react';

export const Wishlist = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Wishlist</h2>
        <p className="text-gray-500 mt-1">Products you've saved for later</p>
      </div>
      
      <div className="border rounded-lg p-6 text-center py-12">
        <p className="text-gray-500">Your wishlist is empty.</p>
        <p className="text-gray-500 mt-1">Items added to your wishlist will appear here.</p>
      </div>
    </div>
  );
};
