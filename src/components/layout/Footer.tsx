
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter section */}
        <div className="mb-12 border-b border-gray-200 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join our newsletter for a 10% discount</h3>
              <p className="text-gray-600 mb-4">
                Register now to get latest updates on promotions & coupons. Don't worry, we not spam!
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 pr-4 py-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  SEND
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By subscribing you agree to our <Link to="/terms" className="text-blue-500 hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-blue-500 hover:underline">Privacy & Cookies Policy</Link>.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Help section */}
            <div>
              <h4 className="text-lg font-medium mb-4">Do You Need Help ?</h4>
              <p className="text-gray-600 mb-4">
                Our chatbot is available on the website to assist you 24/7. Get instant answers to your questions anytime!
              </p>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="h-5 w-5" />
                <div>
                  <p className="text-sm">Need help with your order?</p>
                  <p className="font-medium">support@gura.rw</p>
                </div>
              </div>
            </div>
            
            {/* Get to know us */}
            <div>
              <h4 className="text-lg font-medium mb-4">Get to know us</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/about" className="hover:text-gray-900 transition-colors">About us</Link></li>
                <li><Link to="/advantages" className="hover:text-gray-900 transition-colors">Advantages of Gura</Link></li>
                <li><Link to="/app" className="hover:text-gray-900 transition-colors">The Gura application</Link></li>
                <li><Link to="/press" className="hover:text-gray-900 transition-colors">Press and media</Link></li>
                <li><Link to="/careers" className="hover:text-gray-900 transition-colors">Working for Gura</Link></li>
              </ul>
            </div>
            
            {/* Customer support */}
            <div>
              <h4 className="text-lg font-medium mb-4">Customer support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/terms" className="hover:text-gray-900 transition-colors">Terms and conditions</Link></li>
                <li><Link to="/shipping" className="hover:text-gray-900 transition-colors">Shipping and delivery</Link></li>
                <li><Link to="/returns" className="hover:text-gray-900 transition-colors">Returns and refunds</Link></li>
                <li><Link to="/payment" className="hover:text-gray-900 transition-colors">Payment methods</Link></li>
                <li><Link to="/terms" className="hover:text-gray-900 transition-colors">Terms and conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookie-policy" className="hover:text-gray-900 transition-colors">Cookie Policy</Link></li>
                <li><Link to="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Contact us</Link></li>
              </ul>
            </div>
            
            {/* For business */}
            <div>
              <h4 className="text-lg font-medium mb-4">For business</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/partner" className="hover:text-gray-900 transition-colors">Partner with Gura</Link></li>
                <li><Link to="/wholesale" className="hover:text-gray-900 transition-colors">Wholesale purchases</Link></li>
                <li><Link to="/affiliate" className="hover:text-gray-900 transition-colors">Affiliate program</Link></li>
              </ul>
              
              <h4 className="text-lg font-medium mt-6 mb-4">Download our app</h4>
              <div className="space-y-2">
                <Link to="#" className="block">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-10"
                  />
                </Link>
                <Link to="#" className="block">
                  <img 
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-10"
                  />
                </Link>
              </div>
              
              <h4 className="text-lg font-medium mt-6 mb-2">Follow us on social media:</h4>
              <div className="flex gap-3">
                <Link to="#" className="text-blue-600 hover:text-blue-800">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-black hover:text-gray-700">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-pink-600 hover:text-pink-800">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-blue-700 hover:text-blue-900">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">Copyright {new Date().getFullYear()} © Gura</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms and Conditions</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
            <Link to="/tracking" className="text-gray-600 hover:text-gray-900">Order Tracking</Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex gap-2">
              <img src="/payment-visa.svg" alt="Visa" className="h-8" />
              <img src="/payment-mastercard.svg" alt="Mastercard" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
