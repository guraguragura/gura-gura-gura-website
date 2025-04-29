
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ComingSoonPage from "@/pages/ComingSoonPage";
import PageLayout from "@/components/layout/PageLayout";
import AccountPage from "@/pages/AccountPage";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import FaqPage from "@/pages/FaqPage";
import ContactPage from "@/pages/ContactPage";
import AboutUsPage from "@/pages/AboutUsPage";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import GuraBusinessPage from "@/pages/GuraBusinessPage";
import AuthPage from "@/pages/AuthPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        
        {/* Auth Pages */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Account Pages */}
        <Route path="/account/*" element={<AccountPage />} />
        
        {/* Info Pages */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/business" element={<GuraBusinessPage />} />
        
        {/* Shopping Pages */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
