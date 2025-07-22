
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { usePerformanceTracking } from '@/hooks/usePerformanceTracking';

// Lazy load pages for better performance
const Index = React.lazy(() => import('./pages/Index'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const FaqPage = React.lazy(() => import('./pages/FaqPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  // Track performance metrics
  usePerformanceTracking();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default App;
