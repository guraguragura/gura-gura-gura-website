
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useCustomerProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const { user } = useAuth();

  // Fetch customer data
  useEffect(() => {
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
  }, [user]);

  const refreshAddress = async () => {
    if (customer) {
      // Refresh address data after update
      const { data: addressData } = await supabase
        .from('customer_address')
        .select('*')
        .eq('customer_id', customer.id)
        .maybeSingle();
        
      if (addressData) {
        setAddress(addressData);
      }
    }
  };

  return { isLoading, customer, setCustomer, address, setAddress, refreshAddress };
}
