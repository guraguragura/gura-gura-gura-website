
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterSubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  listIds?: number[];
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

  const sendOrderConfirmation = async (orderData: {
    email: string;
    orderNumber: string;
    customerName: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    shippingAddress: string;
  }) => {
    return sendTransactionalEmail({
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
  };

  return {
    subscribeToNewsletter,
    sendTransactionalEmail,
    sendContactEmail,
    sendOrderConfirmation,
  };
}
