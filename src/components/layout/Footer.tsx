
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GURA</h3>
            <p className="text-gray-400 mb-4">
              Modern Japanese fashion bringing together contemporary design and traditional craftsmanship.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/collections/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/women" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/collections/men" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link to="/collections/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Fashion Street</p>
              <p>Tokyo, Japan 1234-567</p>
              <p className="mt-4">Email: info@gura.com</p>
              <p>Phone: +81 123 456 7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} GURA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
