
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-[90%] px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Shop Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/electronics" className="text-gray-300 hover:text-white">Electronics</Link></li>
              <li><Link to="/categories/fashion" className="text-gray-300 hover:text-white">Fashion</Link></li>
              <li><Link to="/categories/home" className="text-gray-300 hover:text-white">Home & Kitchen</Link></li>
              <li><Link to="/categories/beauty" className="text-gray-300 hover:text-white">Beauty & Personal Care</Link></li>
              <li><Link to="/categories/grocery" className="text-gray-300 hover:text-white">Grocery</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white">View All Categories</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/account/orders" className="text-gray-300 hover:text-white">Track Your Order</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white">Help & FAQs</Link></li>
              <li><Link to="/account/returns" className="text-gray-300 hover:text-white">Returns & Refunds</Link></li>
              <li><Link to="/account" className="text-gray-300 hover:text-white">Your Account</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About Gura</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white">Press</Link></li>
              <li><Link to="/advantages" className="text-gray-300 hover:text-white">Why Shop With Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sustainability</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Business</h3>
            <ul className="space-y-2">
              <li><Link to="/business" className="text-gray-300 hover:text-white">Gura for Business</Link></li>
              <li><Link to="/partner" className="text-gray-300 hover:text-white">Sell on Gura</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Advertise with Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Affiliate Program</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Business Partnerships</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Download Our App</h3>
            <p className="text-gray-300">Shop anytime, anywhere with our mobile app.</p>
            <div className="flex flex-col gap-2">
              <Link to="/app">
                <img 
                  src="/lovable-uploads/d5da0d51-848e-43bf-b2fc-1af13d58f968.png" 
                  alt="App Store" 
                  className="h-10"
                />
              </Link>
              <Link to="/app">
                <img 
                  src="/lovable-uploads/fee0a176-d29e-4bbd-9e57-4c3c62a0be2b.png" 
                  alt="Google Play" 
                  className="h-10"
                />
              </Link>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Gura. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              Gura Rwanda Ltd | KG 123 Street, Kigali, Rwanda
            </div>
            <div className="mt-4 md:mt-0">
              <img src="/placeholder.svg" alt="Payment Methods" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
