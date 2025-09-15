
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Truck } from 'lucide-react';

interface DriverAuthHeaderProps {
  isLogin: boolean;
}

const DriverAuthHeader = ({ isLogin }: DriverAuthHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto mb-4 p-3 bg-blue-600 text-white rounded-full w-fit">
        <Truck className="h-8 w-8" />
      </div>
      <CardTitle className="text-2xl font-bold">
        {isLogin ? 'Driver Login' : 'Driver Signup'}
      </CardTitle>
      <CardDescription>
        {isLogin 
          ? 'Sign in to access your delivery dashboard' 
          : 'Create your driver account to get started'
        }
      </CardDescription>
    </CardHeader>
  );
};

export default DriverAuthHeader;
