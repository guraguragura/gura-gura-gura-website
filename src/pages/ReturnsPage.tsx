
import React from "react";
import { Helmet } from "react-helmet";
import PageLayout from "@/components/layout/PageLayout";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw, Shield, Clock, AlertCircle } from "lucide-react";

const ReturnsPage = () => {
  return (
    <>
      <Helmet>
        <title>Returns & Refunds | Gura</title>
        <meta name="description" content="Learn about Gura's hassle-free return and refund policy" />
      </Helmet>
      <PageLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Returns and Refunds</h1>
        <Separator className="mb-8" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <RefreshCcw className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">Return most items within 30 days</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Shield className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Money-Back Guarantee</h3>
            <p className="text-gray-600">Hassle-free refund process</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <Clock className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Processing</h3>
            <p className="text-gray-600">Refunds processed within 5-7 days</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center text-center">
            <AlertCircle className="text-brand-teal h-10 w-10 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">Damaged items replaced immediately</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Return Policy</h2>
            <p className="text-gray-700">
              We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, you can return most items within 30 days of delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Return Conditions</h2>
            <p className="text-gray-700 mb-3">
              To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>In the same condition as you received it</li>
              <li>In the original packaging (whenever possible)</li>
              <li>Accompanied by the receipt or proof of purchase</li>
              <li>Returned within 30 days of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Items Not Eligible for Returns</h2>
            <p className="text-gray-700 mb-3">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Opened software, video games, music, or electronic downloads</li>
              <li>Gift cards or vouchers</li>
              <li>Perishable goods such as food, flowers, or plants</li>
              <li>Personal care items that have been opened or used</li>
              <li>Custom-made or personalized items</li>
              <li>Items marked as final sale or clearance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">How to Return an Item</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Start a return request:</span> Log in to your account, go to your orders, and select the item you wish to return.
              </li>
              <li>
                <span className="font-medium">Select a reason for return:</span> Choose the appropriate reason from the dropdown menu.
              </li>
              <li>
                <span className="font-medium">Choose a return method:</span> Select whether you'll use our courier service or drop off the item at a designated location.
              </li>
              <li>
                <span className="font-medium">Print the return label:</span> Attach the label to your package.
              </li>
              <li>
                <span className="font-medium">Ship the item back:</span> Send your package using the selected return method.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Refund Process</h2>
            <p className="text-gray-700 mb-2">
              Once we receive your returned item, we will inspect it and notify you about the status of your refund.
            </p>
            <p className="text-gray-700 mb-3">
              If your return is approved, we will initiate a refund to your original payment method. The time it takes for the refund to appear in your account depends on your payment provider:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Credit/debit cards: 5-7 business days</li>
              <li>Mobile money: 2-3 business days</li>
              <li>Bank transfers: 5-10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-brand-teal">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our returns and refunds policy, please contact our customer service team at <a href="mailto:support@gura.rw" className="text-brand-teal hover:underline">support@gura.rw</a> or call us at +250 788 123 456.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
    </>
  );
};

export default ReturnsPage;
