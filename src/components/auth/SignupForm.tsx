
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BasicInfoFields from './BasicInfoFields';
import TermsCheckbox from './TermsCheckbox';

import SubmitButton from './SubmitButton';
import PasswordFields from './PasswordFields';

import { useSignupForm } from './hooks/useSignupForm';
import { validateSignupForm } from './utils/formValidation';

type SignupFormProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

const SignupForm = ({ error, setError }: SignupFormProps) => {
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { formState, updateField } = useSignupForm();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validateSignupForm(formState);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // For now, we're using signUpWithEmail with both methods as Supabase doesn't
      // have a separate signUpWithPhone method - we'd need to customize this
      const result = await signUpWithEmail(
        formState.signupMethod === 'email' ? formState.email : formState.phone,
        formState.password,
        formState.firstName,
        formState.lastName,
        formState.phone
      );

      if (result.error) {
        setError(result.error.message || 'An error occurred during signup');
      } else {
        navigate('/account/personal-info');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-1">Create Account</h1>
        <p className="text-xs md:text-sm text-gray-600">
          Join Gura to shop your favorite products
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-2 md:p-3 rounded-md mb-4 text-xs md:text-sm">
          {error}
        </div>
      )}

      <Tabs 
        defaultValue="email" 
        className="mb-4"
        onValueChange={(value) => updateField('signupMethod', value as 'email' | 'phone')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSignup} className="space-y-4 mt-4">
          <BasicInfoFields 
            firstName={formState.firstName}
            lastName={formState.lastName}
            email={formState.email}
            phone={formState.phone}
            setFirstName={(value) => updateField('firstName', value)}
            setLastName={(value) => updateField('lastName', value)}
            setEmail={(value) => updateField('email', value)}
            setPhone={(value) => updateField('phone', value)}
            signupMethod={formState.signupMethod}
          />

          <PasswordFields
            password={formState.password}
            confirmPassword={formState.confirmPassword}
            setPassword={(value) => updateField('password', value)}
            setConfirmPassword={(value) => updateField('confirmPassword', value)}
          />


          <TermsCheckbox
            checked={formState.agreeToTerms}
            onCheckedChange={(checked) => updateField('agreeToTerms', !!checked)}
          />

          <SubmitButton
            isLoading={isLoading}
            label="Create Account"
            loadingLabel="Creating Account..."
          />
        </form>
      </Tabs>
    </div>
  );
};

export default SignupForm;
