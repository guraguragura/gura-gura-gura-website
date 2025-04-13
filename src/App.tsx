
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import "./App.css";
import IndexPage from "@/pages/Index";
import ProductPage from "@/pages/ProductPage";
import CategoryPage from "@/pages/CategoryPage";
import NotFound from "@/pages/NotFound";
import AboutUsPage from "@/pages/AboutUsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ReturnsPage from "@/pages/ReturnsPage";
import ShippingPage from "@/pages/ShippingPage";
import CookiesPage from "@/pages/CookiesPage";
import ContactPage from "@/pages/ContactPage";
import FaqPage from "@/pages/FaqPage";
import AdvantagesPage from "@/pages/AdvantagesPage";
import GuraBusinessPage from "@/pages/GuraBusinessPage";
import PartnerWithGuraPage from "@/pages/PartnerWithGuraPage";
import GuraAppPage from "@/pages/GuraAppPage";
import CareersPage from "@/pages/CareersPage";
import PressPage from "@/pages/PressPage";
import CartPage from "@/pages/CartPage";
import AccountPage from "@/pages/AccountPage";
import AddressesPage from "@/pages/AddressesPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
import PaymentErrorPage from "@/pages/PaymentErrorPage";
import AuthPage from "@/pages/AuthPage";

import { CartProvider } from "@/contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/categories/:handle" element={<CategoryPage />} /> {/* Add this new route to support both formats */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/advantages" element={<AdvantagesPage />} />
        <Route path="/business" element={<GuraBusinessPage />} />
        <Route path="/partner" element={<PartnerWithGuraPage />} />
        <Route path="/app" element={<GuraAppPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account/*" element={<AccountPage />} />
        <Route path="/account/addresses" element={<AddressesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/error" element={<PaymentErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </CartProvider>
  );
}

export default App;
