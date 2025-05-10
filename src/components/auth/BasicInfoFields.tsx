
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';

type BasicInfoFieldsProps = {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
};

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
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
    </>
  );
};

export default BasicInfoFields;
