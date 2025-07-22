
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    
    // Reset form
    setEmail("");
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FooterSection = ({ 
    title, 
    children, 
    id 
  }: { 
    title: string; 
    children: React.ReactNode; 
    id: string;
  }) => {
    const isOpen = openSections[id];
    
    return isMobile ? (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(id)} className="py-1">
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="font-semibold">{title}</h4>
          {isOpen ? 
            <ChevronUp className="h-4 w-4 text-gray-500" /> : 
            <ChevronDown className="h-4 w-4 text-gray-500" />
          }
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 pb-3">
          {children}
        </CollapsibleContent>
      </Collapsible>
    ) : (
      <div className="mb-0">
        <h4 className="font-semibold mb-4">{title}</h4>
        {children}
      </div>
    );
  };

  return (
    <footer className="bg-white text-gray-700">
      <div className="mx-auto w-full px-4 py-8">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div className="md:max-w-md">
            <h3 className="text-lg font-semibold mb-2">Join our newsletter for a 10% discount</h3>
            <p className="text-gray-600 text-sm mb-3">
              Register now to get latest updates on promotions & coupons.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-10 w-full md:w-56 lg:w-72"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90">
                SEND
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-8">
          {/* Help Section */}
          <FooterSection title="Do You Need Help?" id="help">
            <p className="text-sm mb-3">
              Our chatbot is available 24/7. Get instant answers to your questions!
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-gray-700 flex-shrink-0" />
              <div>
                <p>Need help with your order?</p>
                <a href="mailto:support@gura.rw" className="font-semibold">support@gura.rw</a>
              </div>
            </div>
          </FooterSection>
          
          {/* Get to know us */}
          <FooterSection title="Get to know us" id="about">
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-teal">About us</Link></li>
              <li><Link to="/advantages" className="hover:text-brand-teal">Advantages of Gura</Link></li>
              <li><Link to="/app" className="hover:text-brand-teal">The Gura application</Link></li>
              <li><Link to="/press" className="hover:text-brand-teal">Press and media</Link></li>
              <li><Link to="/careers" className="hover:text-brand-teal">Working for Gura</Link></li>
            </ul>
          </FooterSection>
          
          {/* Customer support */}
          <FooterSection title="Customer support" id="support">
            <ul className="space-y-1.5 text-sm grid grid-cols-1 sm:grid-cols-1">
              <li><Link to="/terms" className="hover:text-brand-teal">Terms and conditions</Link></li>
              <li><Link to="/shipping" className="hover:text-brand-teal">Shipping and delivery</Link></li>
              <li><Link to="/returns" className="hover:text-brand-teal">Returns and refunds</Link></li>
              <li><Link to="/payment" className="hover:text-brand-teal">Payment methods</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-teal">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-brand-teal">Cookie Policy</Link></li>
              <li><Link to="/faq" className="hover:text-brand-teal">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-brand-teal">Contact us</Link></li>
            </ul>
          </FooterSection>
          
          {/* For business */}
          <FooterSection title="For business" id="business">
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/partner" className="hover:text-brand-teal">Partner with Gura</Link></li>
              <li><Link to="/business" className="hover:text-brand-teal">Wholesale purchases</Link></li>
            </ul>
          </FooterSection>
          
          {/* Download app */}
          <FooterSection title="Download our app" id="download">
            <div className="space-y-2">
              <Link to="/app" className="block">
                <img 
                  src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
                  alt="Google Play" 
                  className="h-9"
                />
              </Link>
              <Link to="/app" className="block">
                <img 
                  src="/lovable-uploads/d5da0d51-848e-43bf-b2fc-1af13d58f968.png" 
                  alt="App Store" 
                  className="h-9"
                />
              </Link>
            </div>
            
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Follow us:</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-700 hover:text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </FooterSection>
        </div>
        
        <Separator className="my-6" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-center md:text-left">Copyright 2024 © Gura</p>
            <div className="mt-2">
              <img src="/lovable-uploads/2bb34c1e-85c0-40e8-bed7-ba5fc3d0de11.png" alt="Payment Methods" className="h-5" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link to="/terms" className="hover:text-brand-teal">Terms</Link>
            <Link to="/privacy" className="hover:text-brand-teal">Privacy</Link>
            <Link to="/track" className="hover:text-brand-teal">Track Order</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
