
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const PaymentSuccessPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // If the user navigates directly to this page without making a purchase, redirect to home
  useEffect(() => {
    if (items.length > 0) {
      navigate('/');
    }
  }, [items, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-full bg-green-100 p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <p className="text-gray-600 mb-2">
            Order confirmation has been sent to your email address.
          </p>
          
          <p className="text-gray-600 mb-8">
            Order Reference: <span className="font-semibold">#{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
          </p>
          
          <div className="space-y-4">
            <Button size="lg" asChild>
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/account/orders">
                View Your Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
