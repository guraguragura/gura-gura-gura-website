
import React from 'react';
import { useCustomerProfile } from '@/hooks/useCustomerProfile';
import PersonalInfoForm from './personal-info/PersonalInfoForm';
import PasswordChangeForm from './personal-info/PasswordChangeForm';

export const PersonalInfo = () => {
  const { isLoading, customer, setCustomer } = useCustomerProfile();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
        <p className="text-gray-500 mt-1">Update your personal details</p>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading your information...</p>
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
