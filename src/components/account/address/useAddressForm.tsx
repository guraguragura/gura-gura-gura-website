
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AddressFormValues {
  address_name: string;
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

export const useAddressForm = (isOpen: boolean, onClose: () => void, onAddressAdded: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<AddressFormValues>({
    defaultValues: {
      address_name: '',
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      province: '',
      postal_code: '',
      country_code: 'US',
      phone: '',
      is_default_shipping: false,
      is_default_billing: false
    }
  });

  // Fetch user data when the form opens
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (isOpen) {
        setIsLoading(true);
        try {
          // Fetch customer data to get customer ID and personal info
          const { data, error } = await supabase
            .from('customer')
            .select('*')
            .limit(1)
            .maybeSingle(); // Using maybeSingle instead of single to handle no results

          if (error && error.code !== 'PGRST116') {
            // Only show error if it's not the "no rows returned" error
            console.error('Error fetching customer data:', error);
            toast.error('Error fetching customer data');
            return;
          }

          if (data) {
            setCustomerData(data);
            
            // Pre-fill the first name and last name fields from the customer data
            form.setValue('first_name', data.first_name || '');
            form.setValue('last_name', data.last_name || '');
            form.setValue('phone', data.phone || '');
          } else {
            // If no customer data exists, we'll continue without pre-filling
            console.log('No customer data found, continuing with empty form');
          }
        } catch (error) {
          console.error('Error in fetchCustomerData:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCustomerData();
  }, [isOpen, form]);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (!customerData) {
        console.error('No customer data available');
        toast.error('Customer profile not found. Please create a profile first.');
        return;
      }

      // Generate a UUID for the address
      const addressId = crypto.randomUUID();

      // Insert new address with the generated UUID
      const { error } = await supabase
        .from('customer_address')
        .insert({
          id: addressId,
          customer_id: customerData.id,
          address_name: data.address_name,
          first_name: data.first_name,
          last_name: data.last_name,
          company: data.company,
          address_1: data.address_1,
          address_2: data.address_2,
          city: data.city,
          province: data.province,
          postal_code: data.postal_code,
          country_code: data.country_code,
          phone: data.phone,
          is_default_shipping: data.is_default_shipping,
          is_default_billing: data.is_default_billing
        });

      if (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to add address');
        return;
      }

      toast.success('Address added successfully');
      form.reset();
      onAddressAdded();
      onClose();
    } catch (error) {
      console.error('Error in address submission:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isLoading,
    isSubmitting,
    customerData,
    onSubmit
  };
};
