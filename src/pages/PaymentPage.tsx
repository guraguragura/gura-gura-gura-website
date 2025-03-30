
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Building, ShieldCheck } from "lucide-react";

const PaymentPage = () => {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>
        <Separator className="mb-8" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <CreditCard className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Credit & Debit Cards</h3>
            <p className="text-gray-600">We accept Visa, Mastercard, and more</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Smartphone className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mobile Money</h3>
            <p className="text-gray-600">Pay with MTN Mobile Money or Airtel Money</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Building className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Bank Transfer</h3>
            <p className="text-gray-600">Direct payment to our bank account</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <ShieldCheck className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">All transactions are encrypted and secure</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Credit and Debit Cards</h2>
            <p className="text-gray-700">
              We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover. Your card information is securely processed and encrypted.
            </p>
            <div className="mt-4">
              <img src="/lovable-uploads/2bb34c1e-85c0-40e8-bed7-ba5fc3d0de11.png" alt="Accepted Payment Cards" className="h-8" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Mobile Money</h2>
            <p className="text-gray-700 mb-3">
              Mobile money is a convenient payment option for customers in Rwanda:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><span className="font-medium">MTN Mobile Money:</span> Pay directly from your MTN Mobile Money account</li>
              <li><span className="font-medium">Airtel Money:</span> Transfer funds from your Airtel Money wallet</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To pay with mobile money, select the mobile money option at checkout and follow the instructions to complete your payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Bank Transfer</h2>
            <p className="text-gray-700 mb-3">
              You can pay directly to our bank account. After placing your order, you will receive an email with our bank details and your order reference number.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Bank Account Details:</h4>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Bank Name:</span> Bank of Kigali</li>
                <li><span className="font-medium">Account Name:</span> Gura Rwanda Ltd</li>
                <li><span className="font-medium">Account Number:</span> 000123456789</li>
                <li><span className="font-medium">Branch:</span> Kigali Main Branch</li>
                <li><span className="font-medium">Swift Code:</span> BKIGRWRW</li>
              </ul>
            </div>
            <p className="text-gray-700 mt-3">
              Please include your order number as a reference when making the payment. Your order will be processed once the payment is confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Cash on Delivery</h2>
            <p className="text-gray-700">
              For orders within Kigali, we offer cash on delivery (COD) as a payment option. Simply select COD at checkout and pay in cash when your order is delivered.
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Note:</strong> Cash on delivery is currently only available for orders within Kigali city with a value less than RWF 500,000.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Payment Security</h2>
            <p className="text-gray-700">
              At Gura, we take payment security seriously. All payment information is encrypted using industry-standard SSL (Secure Socket Layer) technology to ensure your data remains protected.
            </p>
            <p className="text-gray-700 mt-2">
              We do not store your full credit card details on our servers. All payment processing is handled by trusted payment partners who comply with the highest security standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Payment Issues</h2>
            <p className="text-gray-700">
              If you experience any issues with payment, please contact our customer service team at <a href="mailto:support@gura.rw" className="text-brand-teal hover:underline">support@gura.rw</a> or call us at +250 788 123 456.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentPage;
