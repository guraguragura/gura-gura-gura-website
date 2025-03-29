
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

type AddressFieldsProps = {
  address: string;
  setAddress: (value: string) => void;
  district: string;
  setDistrict: (value: string) => void;
  sector: string;
  setSector: (value: string) => void;
  cell: string;
  setCell: (value: string) => void;
  village: string;
  setVillage: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  landmark: string;
  setLandmark: (value: string) => void;
};

const AddressFields: React.FC<AddressFieldsProps> = ({
  address,
  setAddress,
  district,
  setDistrict,
  sector,
  setSector,
  cell,
  setCell,
  village,
  setVillage,
  postalCode,
  setPostalCode,
  landmark,
  setLandmark,
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
          <Label htmlFor="district">District</Label>
          <Input 
            id="district" 
            placeholder="District" 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sector">Sector</Label>
          <Input 
            id="sector" 
            placeholder="Sector" 
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cell">Cell</Label>
          <Input 
            id="cell" 
            placeholder="Cell" 
            value={cell}
            onChange={(e) => setCell(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="village">Village</Label>
          <Input 
            id="village" 
            placeholder="Village" 
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal/ZIP Code</Label>
          <Input 
            id="postalCode" 
            placeholder="Postal code" 
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="landmark">Nearby Landmark</Label>
          <Input 
            id="landmark" 
            placeholder="Nearby landmark" 
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressFields;
