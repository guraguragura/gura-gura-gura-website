
import React from "react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className="container mx-auto px-4 max-w-7xl bg-white shadow-sm">
          <Hero />
          <FeaturedProducts />
          <Categories />
          <Newsletter />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
