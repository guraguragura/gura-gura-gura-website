
import React, { useState } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface CustomerFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name?: string;
}

interface PersonalInfoFormProps {
  customer: any;
  setCustomer: (customer: any) => void;
}

const PersonalInfoForm = ({ customer, setCustomer }: PersonalInfoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const form = useForm<CustomerFormValues>({
    defaultValues: {
      first_name: customer?.first_name || user?.user_metadata?.first_name || '',
      last_name: customer?.last_name || user?.user_metadata?.last_name || '',
      email: customer?.email || user?.email || '',
      phone: customer?.phone || user?.user_metadata?.phone_number || '',
      company_name: customer?.company_name || '',
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      let customerId = customer?.id;
      
      // If no customer record exists, create one
      if (!customerId) {
        // Generate a new UUID for the customer
        const newCustomerId = crypto.randomUUID();
        
        const { data: newCustomer, error: createError } = await supabase
          .from('customer')
          .insert({
            id: newCustomerId,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            company_name: values.company_name,
            has_account: true
          })
          .select('*')
          .single();

        if (createError) {
          throw createError;
        }
        
        setCustomer(newCustomer);
      } else {
        // Update existing customer
        const { data: updatedCustomer, error: updateError } = await supabase
          .from('customer')
          .update({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            company_name: values.company_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', customerId)
          .select('*')
          .single();

        if (updateError) {
          throw updateError;
        }
        
        setCustomer(updatedCustomer);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
      <h3 className="text-sm sm:text-base font-medium border-b pb-2 mb-4">Basic Information</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      {...field} 
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      {...field} 
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Company (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Acme Inc." 
                    {...field} 
                    className="text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto text-sm sm:text-base py-2"
          >
            {isSubmitting ? "Saving..." : "Save Personal Information"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
