
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ComingSoonPage from "@/pages/ComingSoonPage";
import Index from "@/pages/Index";
import AccountPage from "@/pages/AccountPage";
import AuthPage from "@/pages/AuthPage";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import FaqPage from "@/pages/FaqPage";
import ContactPage from "@/pages/ContactPage";
import AboutUsPage from "@/pages/AboutUsPage";
import GuraBusinessPage from "@/pages/GuraBusinessPage";
import CheckoutPage from "@/pages/CheckoutPage";

function App() {
  // Check if the full e-commerce site should be shown
  // By default, show coming soon page in production
  const showFullSite = import.meta.env.VITE_SHOW_FULL_SITE === 'true';
  
  // If full site is not enabled, only show coming soon page
  if (!showFullSite) {
    return (
      <>
        <Routes>
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<Navigate to="/coming-soon" replace />} />
        </Routes>
        <Toaster />
      </>
    );
  }

  // Full e-commerce site routes (when explicitly enabled)
  return (
    <>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Index />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        
        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Account pages */}
        <Route path="/account/*" element={<AccountPage />} />
        
        {/* Product and category pages */}
        <Route path="/categories/:categoryHandle" element={<CategoryPage />} />
        <Route path="/products/:productHandle" element={<ProductPage />} />
        
        {/* Shopping */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        
        {/* Info pages */}
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/business" element={<GuraBusinessPage />} />
        
        {/* Collections alias for categories */}
        <Route path="/collections" element={<Navigate to="/categories/all" replace />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
