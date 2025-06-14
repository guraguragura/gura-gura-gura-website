
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { 
  Form
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AddressFormFields from './AddressFormFields';

interface AddressFormValues {
  address: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  nearby_landmark: string;
}

interface AddressInfoFormProps {
  customer: any;
  address: any;
  onAddressUpdated: () => void;
}

const AddressInfoForm = ({ customer, address, onAddressUpdated }: AddressInfoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddressFormValues>({
    defaultValues: {
      address: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
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
    
    setIsSubmitting(true);
    try {
      // Check if address exists for this customer
      if (address) {
        // Update existing address
        const { error: addressUpdateError } = await supabase
          .from('customer_address')
          .update({
            address: values.address,
            district: values.district,
            sector: values.sector,
            cell: values.cell,
            village: values.village,
            nearby_landmark: values.nearby_landmark,
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
            address: values.address,
            district: values.district,
            sector: values.sector,
            cell: values.cell,
            village: values.village,
            nearby_landmark: values.nearby_landmark,
            is_default_shipping: true,
            is_default_billing: true,
          });
          
        if (createAddressError) {
          throw createAddressError;
        }
      }

      toast({
        title: "Success",
        description: "Your address information has been updated.",
      });
      
      // Notify parent component to refresh address data
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

  return (
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
  );
};

export default AddressInfoForm;
