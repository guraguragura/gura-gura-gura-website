
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentItem {
  code: string;
  quantity: number;
  unitAmount: number;
}

interface Customer {
  email: string;
  phoneNumber: string;
  name: string;
}

interface CreateInvoiceRequest {
  transactionId: string;
  paymentItems: PaymentItem[];
  paymentAccountIdentifier: string;
  expiryAt: string;
  description: string;
  customer: Customer;
  language: string;
}

interface InitiatePaymentRequest {
  accountIdentifier: string;
  paymentProvider: 'MTN' | 'AIRTEL';
  invoiceNumber: string;
  transactionReference?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, ...requestData } = await req.json()
    const IREMBOPAY_BASE_URL = 'https://api.sandbox.irembopay.com'

    if (action === 'createInvoice') {
      const response = await fetch(`${IREMBOPAY_BASE_URL}/payments/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'irembopay-secretKey': 'sk_live_4434c9c7db674088888fcbd1b928ab9d',
          'X-API-Version': '2',
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        throw new Error(`Failed to create invoice: ${response.statusText}`)
      }

      const result = await response.json()
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'initiatePayment') {
      const response = await fetch(`${IREMBOPAY_BASE_URL}/payments/transactions/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'irembopay-secretKey': 'sk_live_4434c9c7db674088888fcbd1b928ab9d',
          'X-API-Version': '2',
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        throw new Error(`Failed to initiate payment: ${response.statusText}`)
      }

      const result = await response.json()
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
