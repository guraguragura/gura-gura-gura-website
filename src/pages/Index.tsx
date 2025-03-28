
import React, { useEffect } from "react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import PromotionalBanners from "@/components/home/PromotionalBanners";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedProductsWithPromo from "@/components/home/FeaturedProductsWithPromo";
import TrendingPurchasesWithPromo from "@/components/home/TrendingPurchasesWithPromo";
import CyberMondayBanner from "@/components/home/CyberMondayBanner";
import GiftsForEveryone from "@/components/home/GiftsForEveryone";
import PromotionalBannerCards from "@/components/home/PromotionalBannerCards";
import Footer from "@/components/layout/Footer";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  useEffect(() => {
    // Check categories in the database
    const checkCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('product_category')
          .select('*')
          .eq('is_active', true);
        
        if (error) {
          console.error("Error checking categories:", error);
        } else {
          console.log("Available categories:", data);
        }
      } catch (error) {
        console.error("Failed to check categories:", error);
      }
    };

    checkCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className="mx-auto w-[80%] px-4 max-w-7xl bg-white shadow-sm">
          <Hero />
          <CategoryCarousel />
          <PopularCategories />
          <TopSellingProducts />
          <PromotionalBanners />
          <FeaturedProducts />
          <FeaturedProductsWithPromo />
          <TrendingPurchasesWithPromo />
          <CyberMondayBanner />
          <GiftsForEveryone />
          <PromotionalBannerCards />
          <RecentlyViewed />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
