
import React, { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  handle: string;
  is_active: boolean;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from the database
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle, is_active')
          .eq('is_active', true);
        
        if (error) {
          console.error("Error fetching categories:", error);
        } else if (data) {
          // Safely process the data
          const fetchedCategories: Category[] = data.map(item => ({
            id: item.id || '',
            name: item.name || '',
            handle: item.handle || '',
            is_active: !!item.is_active
          }));
          
          setCategories(fetchedCategories);
          console.log("Available categories:", fetchedCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="flex-grow">
        <div className="mx-auto w-[80%] px-4 max-w-7xl bg-white shadow-sm">
          <Hero />
          <PopularCategories dbCategories={categories} isLoading={isLoading} />
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
