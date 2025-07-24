
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/useNewsletter";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isSubmitting } = useNewsletter({ source: 'newsletter_section' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-8">
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
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || !email}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our{' '}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>{' '}
            and consent to receive our marketing emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
