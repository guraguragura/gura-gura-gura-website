
export interface PaymentItem {
  code: string;
  quantity: number;
  unitAmount: number;
}

export interface Customer {
  email: string;
  phoneNumber: string;
  name: string;
}

export interface CreateInvoiceRequest {
  transactionId: string;
  paymentItems: PaymentItem[];
  paymentAccountIdentifier: string;
  expiryAt: string;
  description: string;
  customer: Customer;
  language: string;
}

export interface InvoiceResponse {
  message: string;
  success: boolean;
  data: {
    amount: number;
    invoiceNumber: string;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    paymentLinkUrl: string;
    type: string;
    paymentStatus: string;
    currency: string;
    customer: {
      fullName: string;
      email: string;
      phoneNumber: string;
    };
    createdBy: string;
    paymentAccountIdentifier: string;
    paymentItems: PaymentItem[];
  };
}

export interface InitiatePaymentRequest {
  accountIdentifier: string;
  paymentProvider: 'MTN' | 'AIRTEL';
  invoiceNumber: string;
  transactionReference?: string;
}

export interface InitiatePaymentResponse {
  message: string;
  success: boolean;
  data: {
    amount: number;
    paymentProvider: string;
    accountIdentifier: string;
    referenceId: string;
    invoiceNumber: string;
  };
}

import { supabase } from '@/integrations/supabase/client';

export class IremboPayService {
  private static generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async createInvoice(
    total: number,
    customer: Customer,
    description: string = ''
  ): Promise<InvoiceResponse> {
    const transactionId = this.generateTransactionId();
    
    const requestBody = {
      action: 'createInvoice',
      transactionId,
      paymentItems: [
        {
          code: "PC-d3ed61f98c", // Default code as specified
          quantity: 1,
          unitAmount: total
        }
      ],
      paymentAccountIdentifier: "Electr-RWF", // Fixed for sandbox
      expiryAt: "",
      description,
      customer,
      language: "EN"
    };

    console.log('Creating invoice with data:', requestBody);

    const { data, error } = await supabase.functions.invoke('irembopay', {
      body: requestBody
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Failed to create invoice: ${error.message}`);
    }

    console.log('Invoice created:', data);
    return data;
  }

  static async initiatePayment(
    invoiceNumber: string,
    phoneNumber: string,
    provider: 'MTN' | 'AIRTEL',
    transactionReference?: string
  ): Promise<InitiatePaymentResponse> {
    const requestBody = {
      action: 'initiatePayment',
      accountIdentifier: phoneNumber,
      paymentProvider: provider,
      invoiceNumber,
      transactionReference: transactionReference || ''
    };

    console.log('Initiating payment with data:', requestBody);

    const { data, error } = await supabase.functions.invoke('irembopay', {
      body: requestBody
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Failed to initiate payment: ${error.message}`);
    }

    console.log('Payment initiated:', data);
    return data;
  }
}
