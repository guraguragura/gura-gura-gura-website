
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 -mx-8 px-8 py-16 text-white text-center rounded-2xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Grow Your Sales with Gura</h1>
        <p className="text-xl mb-8">
          At Gura, we make it easier than ever for businesses to sell online in Rwanda. You bring the products, we handle the rest.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link to="#contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
}
