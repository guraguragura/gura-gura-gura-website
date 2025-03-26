
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive updates on new collections, exclusive offers, and styling tips.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow"
              required
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive our marketing emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
