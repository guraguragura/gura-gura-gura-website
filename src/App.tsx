
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import AccountPage from "./pages/AccountPage";
import AuthPage from "./pages/AuthPage";
import FaqPage from "./pages/FaqPage";
import AboutUsPage from "./pages/AboutUsPage";
import AdvantagesPage from "./pages/AdvantagesPage";
import GuraAppPage from "./pages/GuraAppPage";
import PressPage from "./pages/PressPage";
import CareersPage from "./pages/CareersPage";
import GuraBusinessPage from "./pages/GuraBusinessPage";
import PartnerWithGuraPage from "./pages/PartnerWithGuraPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Index />} />
          <Route path="/collections" element={<Index />} />
          <Route path="/categories/:handle" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/help" element={<FaqPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/advantages" element={<AdvantagesPage />} />
          <Route path="/app" element={<GuraAppPage />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/business" element={<GuraBusinessPage />} />
          <Route path="/partner" element={<PartnerWithGuraPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
