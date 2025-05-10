
import { useState } from 'react';

// Form state interface
export interface SignupFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  agreeToTerms: boolean;
  signupMethod: 'email' | 'phone';
}

export type AddressData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export const useSignupForm = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    agreeToTerms: false,
    signupMethod: 'email'
  });

  const updateField = (field: keyof SignupFormState, value: string | boolean) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formState,
    updateField
  };
};
