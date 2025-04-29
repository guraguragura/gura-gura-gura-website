import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type SignupFormProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

const SignupForm = ({ error, setError }: SignupFormProps) => {
  const { signUpWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  
  // Track gender selection
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      const result = await signUpWithEmail(email, password, firstName, lastName);
      if (result.error) {
        setError(result.error.message || 'Failed to sign up. Please try again.');
      } else {
        // Successfully registered, navigate to personal info
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
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">New at Gura?</h1>
        <p className="text-sm text-gray-600">Create an account to start your Gura shopping!</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <RadioGroup 
            value={gender || ''} 
            onValueChange={(value) => setGender(value as 'male' | 'female')}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2 border rounded-md p-2 px-4">
              <RadioGroupItem value="male" id="male" />
              <label htmlFor="male" className="text-sm cursor-pointer">Male</label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-2 px-4">
              <RadioGroupItem value="female" id="female" />
              <label htmlFor="female" className="text-sm cursor-pointer">Female</label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <User className="h-4 w-4" />
            </span>
            <Input 
              id="firstName" 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <User className="h-4 w-4" />
            </span>
            <Input 
              id="lastName" 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Phone className="h-4 w-4" />
            </span>
            <Input 
              id="phone" 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Mail className="h-4 w-4" />
            </span>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Lock className="h-4 w-4" />
            </span>
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
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
          <div className="text-xs text-gray-500 mt-2">
            <p>Password safety criteria:</p>
            <p>This password should include a user ID as prefix, uppercase, lowercase, and symbols to ensure your account's safety.</p>
            <p>Your account will be blocked after three attempts, verification will be needed to unlock your account.</p>
          </div>
        </div>

        <div className="flex items-start pt-2">
          <Checkbox 
            id="terms" 
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked === true)}
            className="mt-1"
          />
          <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
            I agree to the <Link to="/terms" className="text-blue-500 hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-blue-500 hover:underline">privacy policy</Link>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up for my account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already have an account? <Link to="/auth" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
