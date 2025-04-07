
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

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

interface AddressFormFieldsProps {
  form: UseFormReturn<AddressFormValues>;
}

const AddressFormFields = ({ form }: AddressFormFieldsProps) => {
  return (
    <>
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
          name="postal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Postal code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="is_default_shipping"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <FormLabel className="font-normal">Set as default shipping address</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="is_default_billing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <FormLabel className="font-normal">Set as default billing address</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AddressFormFields;
