
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

type AddressFieldsProps = {
  address: string;
  setAddress: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
};

const AddressFields: React.FC<AddressFieldsProps> = ({
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium border-b pb-2">Address Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <MapPin className="h-4 w-4" />
          </span>
          <Input 
            id="address" 
            placeholder="Your address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            placeholder="City" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input 
            id="state" 
            placeholder="State" 
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input 
            id="zipCode" 
            placeholder="Zip code" 
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input 
          id="country" 
          placeholder="Country" 
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddressFields;
