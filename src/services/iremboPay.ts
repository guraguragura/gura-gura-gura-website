
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

const SANDBOX_BASE_URL = 'https://api.sandbox.irembopay.com';

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
    
    const requestBody: CreateInvoiceRequest = {
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

    const response = await fetch(`${SANDBOX_BASE_URL}/payments/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Failed to create invoice: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Invoice created:', result);
    return result;
  }

  static async initiatePayment(
    invoiceNumber: string,
    phoneNumber: string,
    provider: 'MTN' | 'AIRTEL',
    transactionReference?: string
  ): Promise<InitiatePaymentResponse> {
    const requestBody: InitiatePaymentRequest = {
      accountIdentifier: phoneNumber,
      paymentProvider: provider,
      invoiceNumber,
      transactionReference: transactionReference || ''
    };

    console.log('Initiating payment with data:', requestBody);

    const response = await fetch(`${SANDBOX_BASE_URL}/payments/transactions/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Failed to initiate payment: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Payment initiated:', result);
    return result;
  }
}
