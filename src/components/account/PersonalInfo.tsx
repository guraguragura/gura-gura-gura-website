
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface CustomerFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name?: string;
}

export const PersonalInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  const form = useForm<CustomerFormValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company_name: '',
    },
  });

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual customer ID logic when auth is implemented
        // This is just a placeholder to show data retrieval from the database
        const { data, error } = await supabase
          .from('customer')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching customer data:', error);
          return;
        }

        setCustomer(data);
        
        // Update form values
        form.reset({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          company_name: data.company_name || '',
        });
      } catch (error) {
        console.error('Error in fetchCustomer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [form]);

  const onSubmit = async (values: CustomerFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual customer ID logic when auth is implemented
      if (!customer) return;

      const { error } = await supabase
        .from('customer')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          company_name: values.company_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', customer.id);

      if (error) {
        throw error;
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

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
