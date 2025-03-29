
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoCustomerProfileProps {
  onClose: () => void;
}

const NoCustomerProfile = ({ onClose }: NoCustomerProfileProps) => {
  return (
    <div className="py-6">
      <p className="text-amber-600 mb-3">No customer profile found.</p>
      <p className="text-gray-600">Please create your personal profile in the Personal Information section before adding addresses.</p>
      <Button 
        className="mt-4" 
        variant="outline" 
        onClick={() => {
          onClose();
          window.location.href = '/account/personal-info';
        }}
      >
        Go to Personal Information
      </Button>
    </div>
  );
};

export default NoCustomerProfile;
