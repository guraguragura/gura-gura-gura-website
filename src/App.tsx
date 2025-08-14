import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import PageLoader from '@/components/common/PageLoader';
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

// Import existing page components that weren't routed
const GuraBusinessPage = React.lazy(() => import('./pages/GuraBusinessPage'));
const GuraAppPage = React.lazy(() => import('./pages/GuraAppPage'));
const PartnerWithGuraPage = React.lazy(() => import('./pages/PartnerWithGuraPage'));
const AdvantagesPage = React.lazy(() => import('./pages/AdvantagesPage'));
const CareersPage = React.lazy(() => import('./pages/CareersPage'));
const PressPage = React.lazy(() => import('./pages/PressPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const ShippingPage = React.lazy(() => import('./pages/ShippingPage'));
const ReturnsPage = React.lazy(() => import('./pages/ReturnsPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = React.lazy(() => import('./pages/CookiesPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPasswordPage'));

// Import new page components to be created
const CollectionsPage = React.lazy(() => import('./pages/CollectionsPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const DealsPage = React.lazy(() => import('./pages/DealsPage'));
const GiftsPage = React.lazy(() => import('./pages/GiftsPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage'));
const TrackOrderPage = React.lazy(() => import('./pages/TrackOrderPage'));
const ProductSearchPage = React.lazy(() => import('./pages/ProductSearchPage'));

function App() {
  // Track performance metrics
  usePerformanceTracking();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Suspense fallback={<PageLoader message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Fixed category route pattern to match component links */}
            <Route path="/categories/:categoryName" element={<CategoryPage />} />
            {/* Keep backward compatibility for old category route */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            
            {/* Search page */}
            <Route path="/search" element={<ProductSearchPage />} />
            
            {/* Add routes for existing page components */}
            <Route path="/business" element={<GuraBusinessPage />} />
            <Route path="/app" element={<GuraAppPage />} />
            <Route path="/partner" element={<PartnerWithGuraPage />} />
            <Route path="/advantages" element={<AdvantagesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            
            {/* Add routes for new page components */}
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
            
            {/* Keep existing routes */}
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
