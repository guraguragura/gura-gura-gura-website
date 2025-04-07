
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  return { isLoading, customer, setCustomer };
}
