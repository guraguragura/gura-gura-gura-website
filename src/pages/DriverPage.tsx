
import React from 'react';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import DriverLogin from '@/components/driver/DriverLogin';
import DriverDashboard from '@/components/driver/DriverDashboard';

const DriverPage = () => {
  const { isAuthenticated, loading } = useDriverAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <DriverDashboard /> : <DriverLogin />;
};

export default DriverPage;
