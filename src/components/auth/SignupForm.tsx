
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BasicInfoFields from './BasicInfoFields';
import TermsCheckbox from './TermsCheckbox';
import AddressFields from './AddressFields';
import SubmitButton from './SubmitButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone } from 'lucide-react';

type SignupFormProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

type AddressData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

// Form state interface
interface SignupFormState {
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

const SignupForm = ({ error, setError }: SignupFormProps) => {
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const validateForm = (): string | null => {
    const { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms, signupMethod } = formState;

    if (!firstName || !lastName) {
      return 'Please enter your first and last name';
    }

    if (signupMethod === 'email' && (!email || !/\S+@\S+\.\S+/.test(email))) {
      return 'Please enter a valid email address';
    }

    if (signupMethod === 'phone' && (!phone || !/^\+?[1-9]\d{1,14}$/.test(phone))) {
      return 'Please enter a valid phone number (e.g., +1234567890)';
    }

    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    if (!agreeToTerms) {
      return 'You must agree to the terms and conditions';
    }

    return null;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const addressData: AddressData = {
        address: formState.address,
        city: formState.city,
        state: formState.state,
        zipCode: formState.zipCode,
        country: formState.country,
      };

      // For now, we're using signUpWithEmail with both methods as Supabase doesn't
      // have a separate signUpWithPhone method - we'd need to customize this
      const result = await signUpWithEmail(
        formState.signupMethod === 'email' ? formState.email : formState.phone,
        formState.password,
        formState.firstName,
        formState.lastName,
        addressData
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
            setFirstName={(value) => updateField('firstName', value)}
            setLastName={(value) => updateField('lastName', value)}
          />

          <TabsContent value="email">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700">
                Email*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="pl-8 md:pl-10 text-xs md:text-sm h-9 md:h-10"
                  required={formState.signupMethod === 'email'}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="phone">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={formState.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="pl-8 md:pl-10 text-xs md:text-sm h-9 md:h-10"
                  required={formState.signupMethod === 'phone'}
                />
              </div>
            </div>
          </TabsContent>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700">
                Password*
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formState.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="text-xs md:text-sm h-9 md:h-10"
                required
              />
            </div>

            <div className="space-y-1 md:space-y-2">
              <label htmlFor="confirm-password" className="block text-xs md:text-sm font-medium text-gray-700">
                Confirm Password*
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={formState.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="text-xs md:text-sm h-9 md:h-10"
                required
              />
            </div>
          </div>

          <AddressFields
            address={formState.address}
            city={formState.city}
            state={formState.state}
            zipCode={formState.zipCode}
            country={formState.country}
            setAddress={(value) => updateField('address', value)}
            setCity={(value) => updateField('city', value)}
            setState={(value) => updateField('state', value)}
            setZipCode={(value) => updateField('zipCode', value)}
            setCountry={(value) => updateField('country', value)}
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
