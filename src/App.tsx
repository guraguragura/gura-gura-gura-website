
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentErrorPage from "./pages/PaymentErrorPage";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AccountPage from "./pages/AccountPage";
import AddressesPage from "./pages/AddressesPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import AboutUsPage from "./pages/AboutUsPage";
import AdvantagesPage from "./pages/AdvantagesPage";
import GuraBusinessPage from "./pages/GuraBusinessPage";
import GuraAppPage from "./pages/GuraAppPage";
import PartnerWithGuraPage from "./pages/PartnerWithGuraPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import CareersPage from "./pages/CareersPage";
import PressPage from "./pages/PressPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import NotFound from "./pages/NotFound";
import DriverPage from "./pages/DriverPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:handle" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-error" element={<PaymentErrorPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/advantages" element={<AdvantagesPage />} />
          <Route path="/business" element={<GuraBusinessPage />} />
          <Route path="/app" element={<GuraAppPage />} />
          <Route path="/partner" element={<PartnerWithGuraPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/drivers" element={<DriverPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
