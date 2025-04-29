import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export function useCustomerProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
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
          toast({
            title: "Error",
            description: "Failed to load customer data",
            variant: "destructive",
          });
          return;
        }

        // If customer record exists, use that
        if (customerData) {
          setCustomer(customerData);
        } else {
          // Otherwise, create a new customer profile with user data
          let newCustomerData = {
            id: crypto.randomUUID(),
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone: user.user_metadata?.phone_number || '',
            has_account: true
          };
          
          setCustomer(newCustomerData);
        }
      } catch (error) {
        console.error('Error in fetchCustomer:', error);
        toast({
          title: "Error",
          description: "Failed to load customer profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [user]);

  return { isLoading, customer, setCustomer };
}
