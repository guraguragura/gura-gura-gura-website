
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MapPin, Pencil, Trash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AddressForm from './address/AddressForm';

interface Address {
  id: string;
  address: string;
  first_name: string;
  last_name: string;
  company: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  postal_code: string;
  nearby_landmark: string;
  phone: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

export const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customer_address')
        .select('*');

      if (error) {
        console.error('Error fetching addresses:', error);
        return;
      }

      setAddresses(data || []);
    } catch (error) {
      console.error('Error in fetchAddresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    setShowAddForm(true);
  };

  const handleAddressAdded = () => {
    fetchAddresses();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Addresses</h2>
          <p className="text-gray-500 mt-1">Manage your shipping and billing addresses</p>
        </div>
        <Button className="gap-2" onClick={handleAddAddress}>
          <PlusCircle className="h-4 w-4" />
          <span>Add New</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading addresses...</p>
        </div>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              {address.address && (
                <div className="font-medium text-lg mb-1">{address.address}</div>
              )}
              <div className="mb-2">
                {address.first_name} {address.last_name}
                {address.company && <div className="text-gray-600">{address.company}</div>}
              </div>
              <div className="text-gray-600 mb-3">
                <div>{address.district}</div>
                {address.sector && <div>{address.sector}</div>}
                <div>
                  {address.cell}, {address.village} {address.postal_code}
                </div>
                <div>{address.nearby_landmark}</div>
                {address.phone && <div className="mt-1">{address.phone}</div>}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {address.is_default_shipping && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                    Default Shipping
                  </span>
                )}
                {address.is_default_billing && (
                  <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                    Default Billing
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash className="h-3 w-3" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-6 text-center py-12">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">You haven't added any addresses yet.</p>
          <Button variant="link" className="mt-2" onClick={handleAddAddress}>
            Add your first address
          </Button>
        </div>
      )}

      <AddressForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
        onAddressAdded={handleAddressAdded} 
      />
    </div>
  );
};
