import { useState } from 'react';
import { useCheckout } from './useCheckout';

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  geocodedAddress?: string;
  isConfirmed: boolean;
}

export const useCheckoutWithLocation = () => {
  const [showLocationConfirmation, setShowLocationConfirmation] = useState(false);
  const [pendingCheckoutData, setPendingCheckoutData] = useState<CheckoutData | null>(null);
  const { processCheckout, isProcessing } = useCheckout();

  const initiateCheckout = (data: CheckoutData) => {
    setPendingCheckoutData(data);
    setShowLocationConfirmation(true);
  };

  const handleLocationConfirmed = async (location: LocationData) => {
    if (!pendingCheckoutData) return;

    // Enhance the checkout data with location information
    const enhancedData = {
      ...pendingCheckoutData,
      latitude: location.latitude,
      longitude: location.longitude,
      geocodedAddress: location.geocodedAddress,
      isLocationConfirmed: location.isConfirmed
    };

    setShowLocationConfirmation(false);
    setPendingCheckoutData(null);
    
    // Process the checkout with location data
    processCheckout(enhancedData);
  };

  const handleLocationDialogClose = () => {
    setShowLocationConfirmation(false);
    setPendingCheckoutData(null);
  };

  return {
    initiateCheckout,
    handleLocationConfirmed,
    handleLocationDialogClose,
    showLocationConfirmation,
    pendingCheckoutData,
    isProcessing
  };
};