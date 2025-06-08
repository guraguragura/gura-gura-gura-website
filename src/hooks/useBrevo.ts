
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterSubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  listIds?: number[];
  whatsappOptIn?: boolean;
}

interface TransactionalEmailData {
  to: string;
  templateId: number;
  params?: Record<string, any>;
  subject?: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface WhatsAppMessageData {
  to: string;
  templateName: string;
  params?: Record<string, any>;
  language?: string;
}

export function useBrevo() {
  const subscribeToNewsletter = async (data: NewsletterSubscriptionData) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('brevo-email', {
        body: { action: 'subscribe', ...data }
      });

      if (error) throw error;

      toast.success('Successfully subscribed to newsletter!');
      return result;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe to newsletter. Please try again.');
      throw error;
    }
  };

  const sendTransactionalEmail = async (data: TransactionalEmailData) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('brevo-email', {
        body: { action: 'sendTransactional', ...data }
      });

      if (error) throw error;

      return result;
    } catch (error) {
      console.error('Transactional email error:', error);
      throw error;
    }
  };

  const sendContactEmail = async (data: ContactEmailData) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('brevo-email', {
        body: { action: 'sendContact', ...data }
      });

      if (error) throw error;

      toast.success('Message sent successfully!');
      return result;
    } catch (error) {
      console.error('Contact email error:', error);
      toast.error('Failed to send message. Please try again.');
      throw error;
    }
  };

  const sendWhatsAppMessage = async (data: WhatsAppMessageData) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('brevo-email', {
        body: { action: 'sendWhatsApp', ...data }
      });

      if (error) throw error;

      return result;
    } catch (error) {
      console.error('WhatsApp message error:', error);
      throw error;
    }
  };

  const sendOrderConfirmation = async (orderData: {
    email: string;
    phone?: string;
    orderNumber: string;
    customerName: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    shippingAddress: string;
    sendWhatsApp?: boolean;
  }) => {
    // Send email confirmation
    const emailResult = await sendTransactionalEmail({
      to: orderData.email,
      templateId: 1, // You'll need to create this template in Brevo
      params: {
        customerName: orderData.customerName,
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
      },
      subject: `Order Confirmation #${orderData.orderNumber}`
    });

    // Send WhatsApp confirmation if phone number and opt-in provided
    if (orderData.phone && orderData.sendWhatsApp) {
      try {
        await sendWhatsAppMessage({
          to: orderData.phone,
          templateName: 'order_confirmation', // You'll need to create this template in Brevo
          params: {
            customerName: orderData.customerName,
            orderNumber: orderData.orderNumber,
            total: orderData.total.toString(),
          }
        });
      } catch (error) {
        console.error('WhatsApp order confirmation failed:', error);
        // Don't fail the email if WhatsApp fails
      }
    }

    return emailResult;
  };

  const sendShippingUpdate = async (data: {
    email: string;
    phone?: string;
    orderNumber: string;
    trackingNumber: string;
    customerName: string;
    sendWhatsApp?: boolean;
  }) => {
    // Send email update
    const emailResult = await sendTransactionalEmail({
      to: data.email,
      templateId: 2, // Shipping update template
      params: {
        customerName: data.customerName,
        orderNumber: data.orderNumber,
        trackingNumber: data.trackingNumber,
      },
      subject: `Your order #${data.orderNumber} has shipped!`
    });

    // Send WhatsApp update if phone number and opt-in provided
    if (data.phone && data.sendWhatsApp) {
      try {
        await sendWhatsAppMessage({
          to: data.phone,
          templateName: 'shipping_update', // You'll need to create this template in Brevo
          params: {
            customerName: data.customerName,
            orderNumber: data.orderNumber,
            trackingNumber: data.trackingNumber,
          }
        });
      } catch (error) {
        console.error('WhatsApp shipping update failed:', error);
      }
    }

    return emailResult;
  };

  return {
    subscribeToNewsletter,
    sendTransactionalEmail,
    sendContactEmail,
    sendWhatsAppMessage,
    sendOrderConfirmation,
    sendShippingUpdate,
  };
}
