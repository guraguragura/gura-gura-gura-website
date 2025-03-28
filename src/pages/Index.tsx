
import React from "react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import PopularCategories from "@/components/home/PopularCategories";
import DailyDeals from "@/components/home/DailyDeals";
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
          <CategoryCarousel />
          <DailyDeals />
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
