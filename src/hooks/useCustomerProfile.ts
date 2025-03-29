
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useCustomerProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<any>({
    // Mock customer data for development
    id: 'dev-customer-id',
    email: 'dev@example.com',
    first_name: 'Development',
    last_name: 'User',
    phone: '+1234567890'
  });
  const [address, setAddress] = useState<any>({
    // Mock address data for development
    id: 'dev-address-id',
    customer_id: 'dev-customer-id',
    address: '123 Development St',
    district: 'Dev District',
    sector: 'Dev Sector',
    cell: 'Dev Cell',
    village: 'Dev Village',
    postal_code: '12345',
    nearby_landmark: 'Near Dev Park'
  });
  
  // Mock user data for development
  const user = { id: 'dev-user-id', email: 'dev@example.com' };

  // Fetch customer data - commented out for now
  useEffect(() => {
    // This functionality is temporarily disabled for development
    /*
    const fetchCustomer = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // First try to get customer data linked to user
        const { data: customerData, error: customerError } = await supabase
          .from('customer')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (customerError && customerError.code !== 'PGRST116') {
          console.error('Error fetching customer data:', customerError);
          return;
        }

        if (customerData) {
          setCustomer(customerData);
          
          // Now fetch address information for this customer
          const { data: addressData, error: addressError } = await supabase
            .from('customer_address')
            .select('*')
            .eq('customer_id', customerData.id)
            .maybeSingle();
            
          if (addressError && addressError.code !== 'PGRST116') {
            console.error('Error fetching address data:', addressError);
          }
          
          if (addressData) {
            setAddress(addressData);
          }
        }
      } catch (error) {
        console.error('Error in fetchCustomer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
    */
    
    // Simulate loading for development
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
  }, []);

  const refreshAddress = async () => {
    // Temporarily mocked for development
    console.log('Address refreshed (mock)');
    toast.success('Address updated');
  };

  return { isLoading, customer, setCustomer, address, setAddress, refreshAddress };
}
