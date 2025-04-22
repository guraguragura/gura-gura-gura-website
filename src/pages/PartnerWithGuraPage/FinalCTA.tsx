
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-4">Ready to grow your business with Gura?</h2>
      <p className="text-gray-600 mb-6">
        Join thousands of successful sellers on Rwanda's leading e-commerce platform.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" asChild>
          <a href="#apply">Apply Now</a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/faq">Learn More</Link>
        </Button>
      </div>
    </section>
  );
}
