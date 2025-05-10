
import React from 'react';
import { Input } from '@/components/ui/input';

type PasswordFieldsProps = {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
};

const PasswordFields: React.FC<PasswordFieldsProps> = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700">
          Password*
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-xs md:text-sm h-9 md:h-10"
          required
        />
      </div>
    </div>
  );
};

export default PasswordFields;
