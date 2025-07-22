
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { 
  Form
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AddressFormFields from './AddressFormFields';
import { DeliveryLocationConfirmation } from '../../address/DeliveryLocationConfirmation';

interface AddressFormValues {
  address: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  postal_code: string;
  nearby_landmark: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  geocodedAddress?: string;
  isConfirmed: boolean;
}

interface AddressInfoFormProps {
  customer: any;
  address: any;
  onAddressUpdated: () => void;
}

const AddressInfoForm = ({ customer, address, onAddressUpdated }: AddressInfoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationConfirmation, setShowLocationConfirmation] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<AddressFormValues | null>(null);

  const form = useForm<AddressFormValues>({
    defaultValues: {
      address: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      postal_code: '',
      nearby_landmark: '',
    },
  });

  // Update form values when address data is available
  useEffect(() => {
    if (address) {
      form.reset({
        address: address.address || '',
        district: address.district || '',
        sector: address.sector || '',
        cell: address.cell || '',
        village: address.village || '',
        postal_code: address.postal_code || '',
        nearby_landmark: address.nearby_landmark || '',
      });
    }
  }, [address, form]);

  const onSubmit = async (values: AddressFormValues) => {
    if (!customer) {
      toast({
        title: "Error",
        description: "Please save your personal information first.",
        variant: "destructive",
      });
      return;
    }
    
    // Store form data and show location confirmation
    setPendingFormData(values);
    setShowLocationConfirmation(true);
  };

  const handleLocationConfirmed = async (location: LocationData) => {
    if (!pendingFormData || !customer) return;

    setIsSubmitting(true);
    try {
      // Check if address exists for this customer
      if (address) {
        // Update existing address
        const { error: addressUpdateError } = await supabase
          .from('customer_address')
          .update({
            address: pendingFormData.address,
            district: pendingFormData.district,
            sector: pendingFormData.sector,
            cell: pendingFormData.cell,
            village: pendingFormData.village,
            postal_code: pendingFormData.postal_code,
            nearby_landmark: pendingFormData.nearby_landmark,
            latitude: location.latitude,
            longitude: location.longitude,
            geocoded_address: location.geocodedAddress,
            is_location_confirmed: location.isConfirmed,
            updated_at: new Date().toISOString(),
          })
          .eq('id', address.id);
          
        if (addressUpdateError) {
          throw addressUpdateError;
        }
      } else {
        // Create new address with a new UUID
        const newAddressId = crypto.randomUUID();
        
        const { error: createAddressError } = await supabase
          .from('customer_address')
          .insert({
            id: newAddressId,
            customer_id: customer.id,
            address: pendingFormData.address,
            district: pendingFormData.district,
            sector: pendingFormData.sector,
            cell: pendingFormData.cell,
            village: pendingFormData.village,
            postal_code: pendingFormData.postal_code,
            nearby_landmark: pendingFormData.nearby_landmark,
            latitude: location.latitude,
            longitude: location.longitude,
            geocoded_address: location.geocodedAddress,
            is_location_confirmed: location.isConfirmed,
            is_default_shipping: true,
            is_default_billing: true,
          });
          
        if (createAddressError) {
          throw createAddressError;
        }
      }

      toast({
        title: "Success",
        description: "Your address information has been updated with location confirmed.",
      });
      
      setPendingFormData(null);
      setShowLocationConfirmation(false);
      onAddressUpdated();
    } catch (error: any) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "Failed to update your address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationDialogClose = () => {
    setShowLocationConfirmation(false);
    setPendingFormData(null);
  };

  return (
    <>
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-base font-medium border-b pb-2 mb-4">Address Information</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AddressFormFields form={form} />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Address Information"}
            </Button>
          </form>
        </Form>
      </div>

      <DeliveryLocationConfirmation
        isOpen={showLocationConfirmation}
        onClose={handleLocationDialogClose}
        initialAddress={pendingFormData ? {
          address: pendingFormData.address,
          district: pendingFormData.district,
          sector: pendingFormData.sector,
          cell: pendingFormData.cell,
          village: pendingFormData.village
        } : undefined}
        initialLocation={address ? {
          latitude: address.latitude,
          longitude: address.longitude
        } : undefined}
        onLocationConfirmed={handleLocationConfirmed}
      />
    </>
  );
};

export default AddressInfoForm;
