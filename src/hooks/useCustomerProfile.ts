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
        // First try to get customer data linked to user by user_id
        let { data: customerData, error: customerError } = await supabase
          .from('customer')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        // If not found by user_id, try by email
        if (!customerData && !customerError) {
          const { data: emailCustomer, error: emailError } = await supabase
            .from('customer')
            .select('*')
            .eq('email', user.email)
            .maybeSingle();
          
          customerData = emailCustomer;
          customerError = emailError;
        }

        // Handle actual errors (not "not found")
        if (customerError && customerError.code !== 'PGRST116') {
          console.error('Error fetching customer data:', customerError);
          toast.error("Failed to load customer data");
          setIsLoading(false);
          return;
        }

        // If customer record exists, use it
        if (customerData) {
          // If user_id is missing, update it
          if (!customerData.user_id) {
            const { error: updateError } = await supabase
              .from('customer')
              .update({ user_id: user.id, has_account: true })
              .eq('id', customerData.id);
            
            if (!updateError) {
              customerData.user_id = user.id;
            }
          }
          setCustomer(customerData);
        } else {
          // Create a new customer record in the database
          const newCustomer = {
            id: crypto.randomUUID(),
            email: user.email,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            phone: user.user_metadata?.phone_number || '',
            has_account: true,
            user_id: user.id
          };

          const { data: createdCustomer, error: createError } = await supabase
            .from('customer')
            .insert([newCustomer])
            .select()
            .single();

          if (createError) {
            console.error('Error creating customer record:', createError);
            // Still set customer in state even if DB insert fails
            setCustomer({ id: crypto.randomUUID(), ...newCustomer });
          } else {
            setCustomer(createdCustomer);
          }
        }
      } catch (error) {
        console.error('Error in fetchCustomer:', error);
        toast.error("Failed to load customer profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [user]);

  return { isLoading, customer, setCustomer };
}
