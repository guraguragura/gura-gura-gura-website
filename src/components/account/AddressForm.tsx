
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressAdded: () => void;
}

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

const AddressForm = ({ isOpen, onClose, onAddressAdded }: AddressFormProps) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new shipping or billing address.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-6 flex justify-center">
            <p className="text-gray-500">Loading your information...</p>
          </div>
        ) : !customerData ? (
          <div className="py-6">
            <p className="text-amber-600 mb-3">No customer profile found.</p>
            <p className="text-gray-600">Please create your personal profile in the Personal Information section before adding addresses.</p>
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => {
                onClose();
                window.location.href = '/account/personal-info';
              }}
            >
              Go to Personal Information
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-sm text-gray-700 mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="font-medium">{customerData.first_name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">{customerData.last_name || '—'}</p>
                  </div>
                  {customerData.company_name && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{customerData.company_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Home, Work, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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
                  name="nearby_landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nearby Landmark</FormLabel>
                      <FormControl>
                        <Input placeholder="Nearby landmark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? 'Saving...' : 'Save Address'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
