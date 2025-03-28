
import React from "react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import PromotionalBanners from "@/components/home/PromotionalBanners";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className="mx-auto w-[80%] px-4 max-w-7xl bg-white shadow-sm">
          <Hero />
          <PopularCategories />
          <TopSellingProducts />
          <PromotionalBanners />
          <FeaturedProducts />
          <RecentlyViewed />
          <Newsletter />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
