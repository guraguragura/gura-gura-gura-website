import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AddressFormValues {
  address: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  nearby_landmark: string;
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
      address: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      nearby_landmark: '',
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
            
            // Pre-fill the phone number field from the customer data if available
            if (data.phone) {
              form.setValue('phone', data.phone);
            }
          } else {
            // If no customer data exists, create a new customer record
            try {
              // Generate a UUID for the new customer
              const newCustomerId = crypto.randomUUID();
              
              const { data: newCustomer, error: createError } = await supabase
                .from('customer')
                .insert({
                  id: newCustomerId, 
                  first_name: '',
                  last_name: '',
                  email: '',
                  phone: '',
                  has_account: true
                })
                .select()
                .single();
                
              if (createError) {
                console.error('Error creating customer profile:', createError);
                toast.error('Could not create customer profile');
                return;
              }
              
              if (newCustomer) {
                setCustomerData(newCustomer);
                console.log('Created new customer profile:', newCustomer);
              }
            } catch (createErr) {
              console.error('Error in customer creation:', createErr);
            }
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
        toast.error('Customer profile not found. Please try again.');
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
          address: data.address,
          first_name: customerData.first_name || '',
          last_name: customerData.last_name || '',
          company: customerData.company_name || '',
          district: data.district,
          sector: data.sector,
          cell: data.cell,
          village: data.village,
          nearby_landmark: data.nearby_landmark,
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
    onSubmit,
    customerData
  };
};
