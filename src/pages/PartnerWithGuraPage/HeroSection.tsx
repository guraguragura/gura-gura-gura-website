
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 -mx-8 px-8 py-16 text-white text-center rounded-2xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Partner with Gura</h1>
        <p className="text-xl mb-8">
          Join Rwanda's leading e-commerce platform and sell your products to customers nationwide. Expand your business reach with our trusted marketplace.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link to="#apply">Become a Seller</Link>
        </Button>
      </div>
    </div>
  );
}
