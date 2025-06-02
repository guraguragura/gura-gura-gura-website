
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { IremboPayService, type InvoiceResponse } from '@/services/iremboPay';

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
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [showMoMoModal, setShowMoMoModal] = useState(false);
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

      // Handle different payment methods
      if (formData.paymentMethod === 'momo') {
        // Create invoice with IremboPay
        const invoiceResponse = await IremboPayService.createInvoice(
          total,
          {
            email: formData.email,
            phoneNumber: formData.phone,
            name: `${formData.firstName} ${formData.lastName}`
          },
          `Order payment for ${items.length} item(s)`
        );

        if (invoiceResponse.success) {
          setInvoice(invoiceResponse);
          setShowMoMoModal(true);
        } else {
          throw new Error('Failed to create payment invoice');
        }
      } else {
        // Handle other payment methods (credit card, etc.)
        // PLACEHOLDER: For now, we'll simulate payment processing
        const simulatePaymentSuccess = Math.random() < 0.8;
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!simulatePaymentSuccess) {
          console.log("Simulated payment failure");
          throw new Error("Payment processing failed. Please try again.");
        }

        // Complete the order
        await completeOrder(orderData, isAuthenticated);
      }
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("There was a problem processing your order. Please try again.");
      navigate('/payment-error');
    } finally {
      setIsProcessing(false);
    }
  };

  const completeOrder = async (orderData: any, isAuthenticated: boolean) => {
    // Store order in Supabase for guest checkout or if needed
    if (!isAuthenticated) {
      // Store guest order information
      const { error } = await supabase
        .from('customer_return_requests')
        .insert({
          order_id: `GUEST-${Date.now()}`,
          order_item_id: 'cart-item',
          reason: 'guest_checkout',
          description: JSON.stringify({
            email: orderData.customer.email,
            order_data: orderData,
            status: 'completed'
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
  };

  const handleMoMoPaymentSuccess = async () => {
    try {
      // Here you would typically verify the payment status
      // For now, we'll complete the order directly
      const orderData = {
        customer: {
          email: invoice?.data.customer.email,
          phone: invoice?.data.customer.phoneNumber,
        },
        payment_method: 'momo',
        total_amount: invoice?.data.amount,
        invoice_number: invoice?.data.invoiceNumber,
        transaction_id: invoice?.data.transactionId
      };

      const { data: sessionData } = await supabase.auth.getSession();
      const isAuthenticated = !!sessionData.session;

      await completeOrder(orderData, isAuthenticated);
    } catch (error) {
      console.error("Error completing MoMo payment:", error);
      toast.error("Payment completed but order processing failed. Please contact support.");
    }
  };

  return {
    processCheckout,
    isProcessing,
    invoice,
    showMoMoModal,
    setShowMoMoModal,
    handleMoMoPaymentSuccess
  };
}
