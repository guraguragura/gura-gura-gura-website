
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
  postal_code: string;
  nearby_landmark: string;
  phone: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  geocodedAddress?: string;
  isConfirmed: boolean;
}

export const useAddressForm = (isOpen: boolean, onClose: () => void, onAddressAdded: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationConfirmation, setShowLocationConfirmation] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<AddressFormValues | null>(null);
  const [confirmedLocation, setConfirmedLocation] = useState<LocationData | null>(null);
  
  const form = useForm<AddressFormValues>({
    defaultValues: {
      address: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      postal_code: '',
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
          // Ensure we have authenticated user's email
          const { data: authData, error: authErr } = await supabase.auth.getUser();
          if (authErr || !authData?.user?.email) {
            console.error('Error getting authenticated user for customer lookup:', authErr);
            toast.error('You must be signed in to manage addresses');
            return;
          }
          const userEmail = authData.user.email;
          
          // Fetch customer data to get customer ID and personal info (deterministic latest)
          const { data, error } = await supabase
            .from('customer')
            .select('*')
            .eq('email', userEmail)
            .order('created_at', { ascending: false })
            .maybeSingle(); // Using maybeSingle instead of single to handle no results

          if (error && error.code !== 'PGRST116') {
            // Only show error if it's not the "no rows returned" error
            console.error('Error fetching customer data:', error);
            toast.error(`Error fetching customer data: ${error.message}`);
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
              // Reuse authenticated email captured earlier
              const userEmailForCreate = userEmail;

              // Generate a UUID for the new customer
              const newCustomerId = crypto.randomUUID();
              
              const { data: newCustomer, error: createError } = await supabase
                .from('customer')
                .insert({
                  id: newCustomerId, 
                  first_name: '',
                  last_name: '',
                  // Store authenticated email to satisfy RLS policies
                  email: userEmailForCreate,
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
    if (!customerData) {
      console.error('No customer data available');
      toast.error('Customer profile not found. Please try again.');
      return;
    }

    // Store form data and show location confirmation
    setPendingFormData(data);
    setShowLocationConfirmation(true);
  };

  const handleLocationConfirmed = async (location: LocationData) => {
    if (!pendingFormData || !customerData) return;

    try {
      setIsSubmitting(true);
      setConfirmedLocation(location);

      // Generate a UUID for the address
      const addressId = crypto.randomUUID();

      // Insert new address with location data
      const { error } = await supabase
        .from('customer_address')
        .insert({
          id: addressId,
          customer_id: customerData.id,
          address: pendingFormData.address,
          first_name: customerData.first_name || '',
          last_name: customerData.last_name || '',
          company: customerData.company_name || '',
          district: pendingFormData.district,
          sector: pendingFormData.sector,
          cell: pendingFormData.cell,
          village: pendingFormData.village,
          postal_code: pendingFormData.postal_code,
          nearby_landmark: pendingFormData.nearby_landmark,
          phone: pendingFormData.phone,
          is_default_shipping: pendingFormData.is_default_shipping,
          is_default_billing: pendingFormData.is_default_billing,
          latitude: location.latitude,
          longitude: location.longitude,
          geocoded_address: location.geocodedAddress,
          is_location_confirmed: location.isConfirmed
        });

      if (error) {
        console.error('Error adding address:', error);
        toast.error(`Failed to add address: ${error.message || 'Unknown error'}`);
        return;
      }

      toast.success('Address added successfully with location confirmed');
      form.reset();
      setPendingFormData(null);
      setConfirmedLocation(null);
      setShowLocationConfirmation(false);
      onAddressAdded();
      onClose();
    } catch (error) {
      console.error('Error in address submission:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationDialogClose = () => {
    setShowLocationConfirmation(false);
    setPendingFormData(null);
  };

  return {
    form,
    isLoading,
    isSubmitting,
    onSubmit,
    customerData,
    showLocationConfirmation,
    handleLocationConfirmed,
    handleLocationDialogClose,
    pendingFormData
  };
};
