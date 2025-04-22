
import React from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicationSection() {
  return (
    <section id="apply" className="bg-blue-50 -mx-8 px-8 py-12 rounded-xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Apply to Become a Seller</h2>
        <p className="text-gray-600 mt-2">
          Fill out the form below to start your journey as a Gura seller
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div>
          <h3 className="text-xl font-bold mb-4">What You'll Need</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <div className="text-blue-600 text-sm font-bold">1</div>
              </div>
              <div>
                <h4 className="font-semibold">Business Registration</h4>
                <p className="text-sm text-gray-600">Valid business registration or tax ID</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <div className="text-blue-600 text-sm font-bold">2</div>
              </div>
              <div>
                <h4 className="font-semibold">Bank Account</h4>
                <p className="text-sm text-gray-600">Active bank account for receiving payments</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <div className="text-blue-600 text-sm font-bold">3</div>
              </div>
              <div>
                <h4 className="font-semibold">Product Information</h4>
                <p className="text-sm text-gray-600">Details about the products you want to sell</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <div className="text-blue-600 text-sm font-bold">4</div>
              </div>
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <p className="text-sm text-gray-600">Valid phone number and email address</p>
              </div>
            </li>
          </ul>
          <div className="mt-8 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold">Seller Protection Guarantee</h4>
            </div>
            <p className="text-sm text-gray-700">
              We're committed to creating a safe marketplace for both sellers and buyers. Our seller protection policies help safeguard your business while selling on Gura.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Seller Application</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Categories</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">Select a category</option>
                <option value="fashion">Fashion & Accessories</option>
                <option value="electronics">Electronics & Appliances</option>
                <option value="home">Home & Garden</option>
                <option value="food">Food & Groceries</option>
                <option value="health">Health & Beauty</option>
                <option value="craft">Handcrafted Items</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your products</label>
              <textarea rows={3} className="w-full p-2 border rounded-md"></textarea>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to Gura's Seller Terms and Conditions and Privacy Policy
              </label>
            </div>
            <Button className="w-full">Submit Application</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
