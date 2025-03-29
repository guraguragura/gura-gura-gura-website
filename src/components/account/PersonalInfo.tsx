
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CustomerFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name?: string;
  // Address fields
  address: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  postal_code: string;
  nearby_landmark: string;
}

export const PersonalInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const { user } = useAuth();

  const form = useForm<CustomerFormValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company_name: '',
      address: '',
      district: '',
      sector: '',
      cell: '',
      village: '',
      postal_code: '',
      nearby_landmark: '',
    },
  });

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
          
          // Update form values with customer data
          form.reset({
            first_name: customerData.first_name || '',
            last_name: customerData.last_name || '',
            email: customerData.email || '',
            phone: customerData.phone || '',
            company_name: customerData.company_name || '',
          });
          
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
            // Update form with address data
            form.setValue('address', addressData.address || '');
            form.setValue('district', addressData.district || '');
            form.setValue('sector', addressData.sector || '');
            form.setValue('cell', addressData.cell || '');
            form.setValue('village', addressData.village || '');
            form.setValue('postal_code', addressData.postal_code || '');
            form.setValue('nearby_landmark', addressData.nearby_landmark || '');
          }
        } else if (user) {
          // If no customer data exists but user is logged in,
          // populate form with available user metadata
          const metadata = user.user_metadata || {};
          
          form.reset({
            first_name: metadata.first_name || '',
            last_name: metadata.last_name || '',
            email: user.email || '',
            phone: metadata.phone_number || '',
            company_name: '',
            address: metadata.address || '',
            district: metadata.district || '',
            sector: metadata.sector || '',
            cell: metadata.cell || '',
            village: metadata.village || '',
            postal_code: metadata.postal_code || '',
            nearby_landmark: metadata.nearby_landmark || '',
          });
        }
      } catch (error) {
        console.error('Error in fetchCustomer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [form, user]);

  const onSubmit = async (values: CustomerFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      let customerId = customer?.id;
      
      // If no customer record exists, create one
      if (!customerId) {
        // Generate a new UUID for the customer if we don't have one
        const newCustomerId = crypto.randomUUID();
        
        const { data: newCustomer, error: createError } = await supabase
          .from('customer')
          .insert({
            id: newCustomerId, // Provide the required id field
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            company_name: values.company_name,
            has_account: true
          })
          .select('id')
          .single();

        if (createError) {
          throw createError;
        }
        
        customerId = newCustomer.id;
        setCustomer(newCustomer);
      } else {
        // Update existing customer
        const { error: updateError } = await supabase
          .from('customer')
          .update({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            company_name: values.company_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', customerId);

        if (updateError) {
          throw updateError;
        }
      }
      
      // Check if address exists for this customer
      const { data: existingAddress, error: addressCheckError } = await supabase
        .from('customer_address')
        .select('id')
        .eq('customer_id', customerId)
        .maybeSingle();
        
      if (addressCheckError && addressCheckError.code !== 'PGRST116') {
        throw addressCheckError;
      }
      
      if (existingAddress) {
        // Update existing address
        const { error: addressUpdateError } = await supabase
          .from('customer_address')
          .update({
            address: values.address,
            district: values.district,
            sector: values.sector,
            cell: values.cell,
            village: values.village,
            postal_code: values.postal_code,
            nearby_landmark: values.nearby_landmark,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingAddress.id);
          
        if (addressUpdateError) {
          throw addressUpdateError;
        }
      } else {
        // Create new address with a new UUID
        const newAddressId = crypto.randomUUID();
        
        const { error: createAddressError } = await supabase
          .from('customer_address')
          .insert({
            id: newAddressId, // Provide the required id field
            customer_id: customerId,
            address: values.address,
            district: values.district,
            sector: values.sector,
            cell: values.cell,
            village: values.village,
            postal_code: values.postal_code,
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
        description: "Your personal information has been updated.",
      });
    } catch (error: any) {
      console.error('Error updating customer:', error);
      toast({
        title: "Error",
        description: "Failed to update your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
        <p className="text-gray-500 mt-1">Update your personal details</p>
      </div>

      {isLoading && !customer ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading your information...</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-base font-medium border-b pb-2 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="text-base font-medium border-b pb-2 mb-4">Address Information</h3>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Main St, Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="District" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <FormControl>
                        <Input placeholder="Sector" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cell</FormLabel>
                      <FormControl>
                        <Input placeholder="Cell" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village</FormLabel>
                      <FormControl>
                        <Input placeholder="Village" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal/ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nearby_landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nearby Landmark</FormLabel>
                      <FormControl>
                        <Input placeholder="Near the stadium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
