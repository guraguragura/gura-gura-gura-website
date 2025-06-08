
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { IremboPayService, type InvoiceResponse } from '@/services/iremboPay';
import { useBrevo } from '@/hooks/useBrevo';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export function useCheckout() {
  const { items, total, clearCart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [showPaymentWidget, setShowPaymentWidget] = useState(false);
  const navigate = useNavigate();
  const { sendOrderConfirmation } = useBrevo();

  const processCheckout = async (formData: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Processing order and creating invoice");

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
        setShowPaymentWidget(true);
        toast.success("Order created! Payment widget will open shortly.");
      } else {
        throw new Error('Failed to create payment invoice');
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

    // Send order confirmation email via Brevo
    try {
      await sendOrderConfirmation({
        email: orderData.customer.email,
        orderNumber: orderData.invoice_number || `ORDER-${Date.now()}`,
        customerName: orderData.customer.name || 'Customer',
        items: items.map(item => ({
          name: item.title,
          quantity: item.quantity,
          price: item.discount_price || item.price
        })),
        total: orderData.total_amount || total,
        shippingAddress: orderData.shipping_address || 'Address provided during checkout'
      });
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError);
      // Don't fail the order if email fails
    }
    
    // Clear cart and redirect to success page
    clearCart();
    toast.success("Order placed successfully!");
    navigate('/payment-success');
  };

  const handlePaymentSuccess = async () => {
    try {
      // Here you would typically verify the payment status
      // For now, we'll complete the order directly
      const orderData = {
        customer: {
          email: invoice?.data.customer.email,
          phone: invoice?.data.customer.phoneNumber,
          name: invoice?.data.customer.fullName,
        },
        payment_method: 'widget_payment',
        total_amount: invoice?.data.amount,
        invoice_number: invoice?.data.invoiceNumber,
        transaction_id: invoice?.data.transactionId
      };

      const { data: sessionData } = await supabase.auth.getSession();
      const isAuthenticated = !!sessionData.session;

      await completeOrder(orderData, isAuthenticated);
    } catch (error) {
      console.error("Error completing payment:", error);
      toast.error("Payment completed but order processing failed. Please contact support.");
    } finally {
      setShowPaymentWidget(false);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentWidget(false);
    setInvoice(null);
  };

  return {
    processCheckout,
    isProcessing,
    invoice,
    showPaymentWidget,
    handlePaymentSuccess,
    handlePaymentClose
  };
}
