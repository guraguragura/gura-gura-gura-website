
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

const InfoSections = () => {
  return (
    <section className="grid md:grid-cols-2 gap-12">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Kigali City</span>
            <span className="font-medium">Same Day / Next Day</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Northern Province</span>
            <span className="font-medium">2-3 Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Southern Province</span>
            <span className="font-medium">2-3 Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Eastern Province</span>
            <span className="font-medium">2-3 Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Western Province</span>
            <span className="font-medium">2-3 Days</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
        <Separator className="mb-4" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">Credit/Debit Cards</h4>
              <p className="text-sm text-gray-600">Visa, MasterCard, and other major cards accepted</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M5 4h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" /><path d="M18 8H6" /><path d="M18 12H6" /><path d="M12 16H6" /></svg>
            </div>
            <div>
              <h4 className="font-medium">Mobile Money</h4>
              <p className="text-sm text-gray-600">MTN Mobile Money and Airtel Money</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="8" cy="8" r="7" /><path d="M18.09 10.37A6 6 0 1 1 9.33 5.62" /><path d="M10.68 16.32A6 6 0 1 0 19.44 11.58" /></svg>
            </div>
            <div>
              <h4 className="font-medium">Cash on Delivery</h4>
              <p className="text-sm text-gray-600">Pay when your order arrives</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            </div>
            <div>
              <h4 className="font-medium">Bank Transfer</h4>
              <p className="text-sm text-gray-600">Direct bank transfers accepted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSections;
