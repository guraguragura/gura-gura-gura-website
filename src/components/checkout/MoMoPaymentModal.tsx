
import React, { useEffect } from 'react';
import { type InvoiceResponse } from '@/services/iremboPay';
import { toast } from 'sonner';

// Declare IremboPay global variable
declare global {
  interface Window {
    IremboPay: {
      initiate: (config: {
        publicKey: string;
        invoiceNumber: string;
        locale: string;
        callback: (err: any, resp: any) => void;
      }) => void;
      closeModal: () => void;
      locale: {
        EN: string;
        FR: string;
      };
    };
  }
}

interface MoMoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceResponse | null;
  onPaymentSuccess: () => void;
}

export const MoMoPaymentModal: React.FC<MoMoPaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onPaymentSuccess
}) => {
  useEffect(() => {
    if (isOpen && invoice) {
      // Load IremboPay script when modal should open
      const script = document.createElement('script');
      script.src = 'https://dashboard.sandbox.irembopay.com/assets/payment/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('IremboPay widget loaded successfully');
        // Directly initiate payment widget without showing our modal
        initiatePayment();
      };
      script.onerror = () => {
        console.error('Failed to load IremboPay widget');
        toast.error('Failed to load payment system');
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isOpen, invoice]);

  const initiatePayment = () => {
    if (!invoice) {
      toast.error('Invoice not found');
      return;
    }

    // Check if IremboPay widget is loaded
    if (!window.IremboPay) {
      toast.error('Payment system is loading, please try again in a moment');
      return;
    }

    try {
      console.log('Initiating payment with invoice:', invoice.data.invoiceNumber);
      
      window.IremboPay.initiate({
        publicKey: "pk_live_ab2fbda299bc4f9c9b55c7277af4f885",
        invoiceNumber: invoice.data.invoiceNumber,
        locale: window.IremboPay.locale.EN,
        callback: (err: any, resp: any) => {
          if (!err) {
            // Payment successful
            console.log('Payment successful:', resp);
            toast.success('Payment completed successfully!');
            onPaymentSuccess();
            onClose();
          } else {
            // Payment failed or error occurred
            console.error('Payment error:', err);
            
            // Handle specific error scenarios based on IremboPay documentation
            if (err.code === 'INVALID_KEY') {
              toast.error('Invalid payment configuration');
            } else if (err.code === 'INVOICE_NOT_FOUND') {
              toast.error('Invoice not found');
            } else if (err.code === 'BAD_INVOICES_PAID') {
              toast.error('Invoice has already been paid');
            } else if (err.code === 'BAD_INVOICES_PAYMENT_EXPIRED') {
              toast.error('Invoice has expired');
            } else if (err.code === 'BAD_INVOICES_IN_BATCH') {
              toast.error('Invoice is already linked to a batch');
            } else if (err.code === 'INVOICE_MISSING') {
              toast.error('Invoice required');
            } else if (err.code === 'BAD_LOCALE') {
              toast.error('Unsupported locale');
            } else {
              toast.error('Payment failed. Please try again.');
            }
            onClose();
          }
        }
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
      onClose();
    }
  };

  // This component no longer renders any UI - it just handles the payment widget logic
  return null;
};
