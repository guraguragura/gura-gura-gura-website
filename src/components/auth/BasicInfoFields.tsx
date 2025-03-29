
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

type BasicInfoFieldsProps = {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
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
    </>
  );
};

export default BasicInfoFields;
