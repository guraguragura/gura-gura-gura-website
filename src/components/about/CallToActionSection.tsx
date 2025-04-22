
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-6">Start Your Gura Journey Today</h2>
    <div className="flex flex-wrap justify-center gap-4">
      <Link to="/">
        <Button size="lg" className="rounded-full">
          Start Shopping
        </Button>
      </Link>
      <Link to="/app">
        <Button variant="outline" size="lg" className="rounded-full">
          Learn More About Our App
        </Button>
      </Link>
    </div>
  </div>
);

export default CallToActionSection;
