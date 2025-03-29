
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const Addresses = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Addresses</h2>
          <p className="text-gray-500 mt-1">Manage your shipping and billing addresses</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add New</span>
        </Button>
      </div>

      <div className="border rounded-lg p-6 text-center py-12">
        <p className="text-gray-500">You haven't added any addresses yet.</p>
        <Button variant="link" className="mt-2">Add your first address</Button>
      </div>
    </div>
  );
};
