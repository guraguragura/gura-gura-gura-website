
import React from 'react';
import { Link } from 'react-router-dom';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PaymentErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-full bg-red-100 p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Unsuccessful</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            We were unable to process your payment. Your order has not been completed.
          </p>
          
          <Alert className="bg-red-50 border-red-200 mb-6">
            <AlertDescription className="text-red-800">
              This is a placeholder for payment error. Integration with a real payment processor will be added later.
            </AlertDescription>
          </Alert>
          
          <p className="text-gray-600 mb-8">
            Please try again or choose a different payment method. If this issue persists, contact our customer support.
          </p>
          
          <div className="space-y-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <Link to="/checkout">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/cart">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentErrorPage;
