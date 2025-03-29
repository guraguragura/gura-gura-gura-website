
import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import AddressFields from './AddressFields';
import BasicInfoFields from './BasicInfoFields';
import TermsCheckbox from './TermsCheckbox';
import SubmitButton from './SubmitButton';

type SignupFormProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

const SignupForm = ({ error, setError }: SignupFormProps) => {
  const { signUpWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Address fields
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [sector, setSector] = useState('');
  const [cell, setCell] = useState('');
  const [village, setVillage] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [landmark, setLandmark] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await signUpWithEmail(
        email, 
        password, 
        firstName, 
        lastName, 
        {
          address,
          district,
          sector,
          cell,
          village,
          postal_code: postalCode,
          nearby_landmark: landmark
        }
      );
      
      if (result.error) {
        setError(result.error.message || 'Failed to create account. Please try again.');
      } else {
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSignUp} className="space-y-4">
        <BasicInfoFields 
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <AddressFields 
          address={address}
          setAddress={setAddress}
          district={district}
          setDistrict={setDistrict}
          sector={sector}
          setSector={setSector}
          cell={cell}
          setCell={setCell}
          village={village}
          setVillage={setVillage}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          landmark={landmark}
          setLandmark={setLandmark}
        />

        <TermsCheckbox 
          agreeTerms={agreeTerms}
          setAgreeTerms={setAgreeTerms}
        />

        <SubmitButton 
          isLoading={isLoading}
          label="Create Account"
          loadingLabel="Creating Account..."
        />
      </form>
    </>
  );
};

export default SignupForm;
