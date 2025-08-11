
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAddressForm } from './useAddressForm';
import AddressFormFields from './AddressFormFields';
import { DeliveryLocationConfirmation } from '../DeliveryLocationConfirmation';

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressAdded: () => void;
}

const AddressForm = ({ isOpen, onClose, onAddressAdded }: AddressFormProps) => {
  const { 
    form, 
    isLoading, 
    isSubmitting, 
    onSubmit, 
    customerData, 
    showLocationConfirmation, 
    handleLocationConfirmed, 
    handleLocationDialogClose, 
    pendingFormData 
  } = useAddressForm(isOpen, onClose, onAddressAdded);

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

              <AddressFormFields form={form} />
              
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
      
      <DeliveryLocationConfirmation
        isOpen={showLocationConfirmation}
        onClose={handleLocationDialogClose}
        initialAddress={pendingFormData ? {
          address: pendingFormData.address,
          district: pendingFormData.district,
          sector: pendingFormData.sector,
          cell: pendingFormData.cell,
          village: pendingFormData.village
        } : undefined}
        onLocationConfirmed={handleLocationConfirmed}
      />
    </Dialog>
  );
};

export default AddressForm;
