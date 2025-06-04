
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2, Smartphone, Building2, Globe } from 'lucide-react';
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
  const [isWidgetLoading, setIsWidgetLoading] = React.useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsWidgetLoading(true);
      // Load IremboPay script when modal opens
      const script = document.createElement('script');
      script.src = 'https://dashboard.sandbox.irembopay.com/assets/payment/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('IremboPay widget loaded successfully');
        setIsWidgetLoading(false);
      };
      script.onerror = () => {
        console.error('Failed to load IremboPay widget');
        toast.error('Failed to load payment system');
        setIsWidgetLoading(false);
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup script when modal closes
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isOpen]);

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
      <DialogContent className="sm:max-w-lg w-full max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Complete Your Payment
          </DialogTitle>
        </DialogHeader>
        
        {invoice && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="font-bold text-2xl text-green-600">{invoice.data.amount.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Invoice #:</span>
                <span className="font-mono bg-white px-2 py-1 rounded">{invoice.data.invoiceNumber}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4 text-center">Choose Your Payment Method</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center p-3 bg-white rounded-lg border">
                  <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium">MTN MoMo</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-white rounded-lg border">
                  <Smartphone className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm font-medium">Airtel Money</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-white rounded-lg border">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">Cards</span>
                </div>
                <div className="flex items-center justify-center p-3 bg-white rounded-lg border">
                  <Building2 className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium">Bank Transfer</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center p-2 bg-white rounded-lg border inline-flex">
                  <Globe className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-xs text-gray-600">Cash via Agents</span>
                </div>
              </div>
            </div>

            {isWidgetLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">Loading payment options...</span>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={makePayment} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
                  size="lg"
                >
                  Pay {invoice.data.amount.toLocaleString()} RWF
                </Button>
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              🔒 Secure payment powered by IremboPay. All payment methods will be available in the next step.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
