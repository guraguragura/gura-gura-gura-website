
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Smartphone } from 'lucide-react';
import { IremboPayService, type InvoiceResponse } from '@/services/iremboPay';
import { toast } from 'sonner';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState<'MTN' | 'AIRTEL'>('MTN');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!invoice || !phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await IremboPayService.initiatePayment(
        invoice.data.invoiceNumber,
        phoneNumber,
        provider
      );

      if (result.success) {
        toast.success(result.message);
        console.log('Payment initiated successfully:', result.data);
        
        // In a real implementation, you would check payment status
        // For now, we'll simulate a successful payment after a delay
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2000);
      } else {
        toast.error('Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Limit to 12 digits (250 + 9 digits)
    if (cleaned.length > 12) return phoneNumber;
    
    // If it doesn't start with 250, add it
    if (cleaned.length > 0 && !cleaned.startsWith('250')) {
      if (cleaned.length <= 9) {
        return '250' + cleaned;
      }
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Money Payment
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
              <div>
                <Label htmlFor="provider">Select Provider</Label>
                <RadioGroup value={provider} onValueChange={(value) => setProvider(value as 'MTN' | 'AIRTEL')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MTN" id="mtn" />
                    <Label htmlFor="mtn">MTN Mobile Money</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="AIRTEL" id="airtel" />
                    <Label htmlFor="airtel">Airtel Money</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="250781234567"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your {provider} number (format: 250XXXXXXXXX)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing || !phoneNumber}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              You will receive a prompt on your phone to approve the payment
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
