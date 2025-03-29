
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AddressFields from './AddressFields';

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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <Input 
                id="firstName" 
                placeholder="John" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <User className="h-4 w-4" />
              </span>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signupEmail">Email</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Mail className="h-4 w-4" />
            </span>
            <Input 
              id="signupEmail" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signupPassword">Password</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Lock className="h-4 w-4" />
            </span>
            <Input 
              id="signupPassword" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

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

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : 'Create Account'}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
