
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { LogOut, Truck, User } from 'lucide-react';

interface DriverHeaderProps {
  driverProfile: {
    first_name: string;
    last_name: string;
    is_available: boolean;
  };
  onSignOut: () => void;
  onAvailabilityChange: (isAvailable: boolean) => void;
  updatingAvailability: boolean;
}

const DriverHeader = ({ 
  driverProfile, 
  onSignOut, 
  onAvailabilityChange, 
  updatingAvailability 
}: DriverHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {driverProfile?.first_name} {driverProfile?.last_name}
              </h1>
              <p className="text-sm text-gray-600 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Driver Dashboard
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Availability Toggle */}
        <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${driverProfile?.is_available ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">
              {driverProfile?.is_available ? 'Available' : 'Offline'}
            </span>
          </div>
          <Switch
            checked={driverProfile?.is_available || false}
            onCheckedChange={onAvailabilityChange}
            disabled={updatingAvailability}
          />
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
