
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBrevo } from "@/hooks/useBrevo";
import { Loader2 } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { subscribeToNewsletter } = useBrevo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await subscribeToNewsletter({ email });
      setEmail("");
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive updates on new collections, exclusive offers, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
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
