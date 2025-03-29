
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type TermsCheckboxProps = {
  agreeTerms: boolean;
  setAgreeTerms: (checked: boolean) => void;
};

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  agreeTerms,
  setAgreeTerms
}) => {
  return (
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
  );
};

export default TermsCheckbox;
