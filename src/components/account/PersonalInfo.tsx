
import React from 'react';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import PasswordChangeForm from './personal-info/PasswordChangeForm';
import { Skeleton } from '@/components/ui/skeleton';

export const PersonalInfo = () => {
  const { isLoading, customer, setCustomer } = useCustomerProfile();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Personal Information</h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">Update your personal details</p>
      </div>

      {isLoading ? (
        <div className="py-6 space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <>
          <PersonalInfoForm 
            customer={customer} 
            setCustomer={setCustomer} 
          />
          
          <PasswordChangeForm />
        </>
      )}
    </div>
  );
};
