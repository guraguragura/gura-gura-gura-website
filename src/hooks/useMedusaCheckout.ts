
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  paymentMethod: string;
}

export function useMedusaCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const processCheckout = async (formData: CheckoutFormData, cartId: string) => {
    if (!cartId) {
      toast.error("No cart found");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Processing checkout with Medusa for cart:", cartId);

      // Step 1: Add shipping address to cart
      const shippingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        province: formData.state,
        postal_code: formData.zipCode,
        country_code: 'US',
        phone: formData.phone
      };

      const { data: addressData, error: addressError } = await supabase.functions.invoke('medusa-checkout', {
        body: {
          action: 'add-shipping-address',
          cart_id: cartId,
          address: shippingAddress
        }
      });

      if (addressError || addressData.error) {
        throw new Error(addressError?.message || addressData.error || 'Failed to add shipping address');
      }

      // Step 2: Create payment sessions
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('medusa-checkout', {
        body: {
          action: 'create-payment-sessions',
          cart_id: cartId
        }
      });

      if (paymentError || paymentData.error) {
        throw new Error(paymentError?.message || paymentData.error || 'Failed to create payment sessions');
      }

      // Step 3: Set payment session (assuming manual payment for now)
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('medusa-checkout', {
        body: {
          action: 'set-payment-session',
          cart_id: cartId,
          provider_id: 'manual' // This would be 'stripe' in production
        }
      });

      if (sessionError || sessionData.error) {
        throw new Error(sessionError?.message || sessionData.error || 'Failed to set payment session');
      }

      // For now, simulate payment success (80% success rate for testing)
      const simulatePaymentSuccess = Math.random() < 0.8;
      
      if (!simulatePaymentSuccess) {
        throw new Error("Payment processing failed. Please try again.");
      }

      // Step 4: Complete the cart (create order)
      const { data: orderData, error: orderError } = await supabase.functions.invoke('medusa-checkout', {
        body: {
          action: 'complete-cart',
          cart_id: cartId,
          firstName: formData.firstName,
          lastName: formData.lastName
        }
      });

      if (orderError || orderData.error) {
        throw new Error(orderError?.message || orderData.error || 'Failed to complete order');
      }

      console.log('Order completed successfully:', orderData.order?.display_id);
      
      // Clear cart from localStorage
      localStorage.removeItem('medusa_cart_id');
      
      toast.success("Order placed successfully!");
      navigate('/payment-success');
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "There was a problem processing your order. Please try again.");
      navigate('/payment-error');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing
  };
}
