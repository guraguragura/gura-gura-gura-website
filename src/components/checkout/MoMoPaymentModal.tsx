
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
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
    // Load IremboPay script when component mounts
    const script = document.createElement('script');
    script.src = 'https://dashboard.sandbox.irembopay.com/assets/payment/inline.js';
    script.async = true;
    script.onload = () => {
      console.log('IremboPay widget loaded successfully');
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
  }, []);

  const makePayment = () => {
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
        publicKey: "pk_live_ab2fbda299bc4f9c9b55c7277af4f885", // Your actual public key
        invoiceNumber: invoice.data.invoiceNumber,
        locale: window.IremboPay.locale.EN,
        callback: (err: any, resp: any) => {
          if (!err) {
            // Payment successful
            console.log('Payment successful:', resp);
            toast.success('Payment completed successfully!');
            onPaymentSuccess();
            onClose();
            
            // Close the IremboPay widget modal
            if (window.IremboPay.closeModal) {
              window.IremboPay.closeModal();
            }
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
          }
        }
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>
        
        {invoice && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Amount to Pay:</span>
                <span className="font-bold text-lg">{invoice.data.amount.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Invoice Number:</span>
                <span className="text-sm font-mono">{invoice.data.invoiceNumber}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">All Payment Options Available:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• MTN Mobile Money</li>
                  <li>• Airtel Money</li>
                  <li>• Credit/Debit Cards (Visa, MasterCard)</li>
                  <li>• Bank Transfer</li>
                  <li>• Cash Payments via Agents</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                  The payment widget will open with all available options for you to choose from.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={makePayment} 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Pay Now
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              A secure payment widget will open with all available payment methods
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
