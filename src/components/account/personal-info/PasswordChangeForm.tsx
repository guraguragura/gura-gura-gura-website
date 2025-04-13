
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMobile } from '@/hooks/use-mobile';

const passwordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const PasswordChangeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true);
    
    // Mock password change for development
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your password has been updated.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
      <h3 className="text-sm sm:text-base font-medium border-b pb-2 mb-4">Change Password</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your current password" 
                    {...field}
                    className="text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your new password" 
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
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Confirm New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Confirm your new password" 
                      {...field}
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto text-sm sm:text-base py-2"
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
