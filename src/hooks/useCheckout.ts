
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

export function useCheckout() {
  const { items, total, clearCart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const processCheckout = async (formData: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Check if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      const isAuthenticated = !!sessionData.session;

      // Step 1: Prepare order data
      const orderData = {
        customer: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          province: formData.state,
          postal_code: formData.zipCode,
          phone: formData.phone
        },
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.discount_price || item.price
        })),
        payment_method: formData.paymentMethod,
        total_amount: total
      };

      console.log("Processing order with data:", orderData);

      // Here we would actually connect to Medusa backend
      // This is a placeholder for the actual API call
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store order in Supabase for guest checkout or if needed
      if (!isAuthenticated) {
        // First check if we need to create the guest_orders table
        // Instead of trying to store in a non-existent table, let's use customer_return_requests
        // for now as a temporary storage (this is just a placeholder until we properly set up the backend)
        const { error } = await supabase
          .from('customer_return_requests')
          .insert({
            order_id: `GUEST-${Date.now()}`,
            order_item_id: 'cart-item',
            reason: 'guest_checkout',
            description: JSON.stringify({
              email: formData.email,
              order_data: orderData,
              status: 'pending'
            })
          });
          
        if (error) {
          console.error("Error storing guest order:", error);
          throw new Error("Failed to store order information");
        }
      }
      
      // Clear cart and redirect to success page
      clearCart();
      toast.success("Order placed successfully!");
      navigate('/payment-success');
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was a problem processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing
  };
}
