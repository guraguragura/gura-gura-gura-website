
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';

type BasicInfoFieldsProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  signupMethod: 'email' | 'phone';
};

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  firstName,
  lastName,
  email,
  phone,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  signupMethod,
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

      {signupMethod === 'email' && (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-8 md:pl-10 text-xs md:text-sm h-9 md:h-10"
              required={signupMethod === 'email'}
            />
          </div>
        </div>
      )}

      {signupMethod === 'phone' && (
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="phone-primary" className="block text-xs md:text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </span>
            <Input
              id="phone-primary"
              type="tel"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-8 md:pl-10 text-xs md:text-sm h-9 md:h-10"
              required={signupMethod === 'phone'}
            />
          </div>
        </div>
      )}

      <div className="space-y-1 md:space-y-2">
        <label htmlFor="phone-contact" className="block text-xs md:text-sm font-medium text-gray-700">
          Phone Number*
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </span>
          <Input
            id="phone-contact"
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-8 md:pl-10 text-xs md:text-sm h-9 md:h-10"
            required
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfoFields;
