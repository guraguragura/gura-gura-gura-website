
import React, { useEffect, useState, lazy, Suspense } from "react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import ProminentSearchBar from "@/components/home/ProminentSearchBar";
import SocialProof from "@/components/home/SocialProof";
import StickyCTA from "@/components/home/StickyCTA";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load below-the-fold components for better performance
const RecentlyViewed = lazy(() => import("@/components/home/RecentlyViewed"));
const FeaturedProducts = lazy(() => import("@/components/home/FeaturedProducts"));
const FeaturedProductsWithPromo = lazy(() => import("@/components/home/FeaturedProductsWithPromo"));
const TrendingPurchasesWithPromo = lazy(() => import("@/components/home/TrendingPurchasesWithPromo"));
const CyberMondayBanner = lazy(() => import("@/components/home/CyberMondayBanner"));
const GiftsForEveryone = lazy(() => import("@/components/home/GiftsForEveryone"));
const PromotionalBannerCards = lazy(() => import("@/components/home/PromotionalBannerCards"));
const PersonalizedRecommendations = lazy(() => import("@/components/product/PersonalizedRecommendations"));
const Newsletter = lazy(() => import("@/components/home/Newsletter"));

interface Category {
  id: string;
  name: string;
  handle: string;
  is_active: boolean;
  metadata?: any;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Fetch categories from the database
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('product_category')
          .select('id, name, handle, is_active, metadata')
          .eq('is_active', true)
          .is('parent_category_id', null)
          .order('rank', { ascending: true });
        
        if (error) {
          console.error("Error fetching categories:", error);
        } else if (data) {
          // Safely process the data
          const fetchedCategories: Category[] = data.map(item => ({
            id: item.id || '',
            name: item.name || '',
            handle: item.handle || '',
            is_active: !!item.is_active,
            metadata: item.metadata
          }));
          
          setCategories(fetchedCategories);
          
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
      <StickyCTA />
      
      <div className="flex-grow">
        <div className={`mx-auto ${isMobile ? 'w-[94%]' : 'w-[80%]'} px-0 sm:px-4 max-w-7xl bg-white shadow-sm`}>
          {/* Above the fold - Critical content */}
          <Hero />
          <ProminentSearchBar />
          <PopularCategories dbCategories={categories} isLoading={isLoading} />
          <TopSellingProducts />
          
          {/* Below the fold - Lazy loaded */}
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <FeaturedProducts />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <FeaturedProductsWithPromo />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <TrendingPurchasesWithPromo />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[300px] my-8" />}>
            <CyberMondayBanner />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <GiftsForEveryone />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <PromotionalBannerCards />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[400px] my-8" />}>
            <PersonalizedRecommendations 
              title="You May Also Like" 
              limit={8}
              className="px-4"
            />
          </Suspense>
          
          <Suspense fallback={<Skeleton className="w-full h-[300px] my-8" />}>
            <RecentlyViewed />
          </Suspense>
        </div>
        
        {/* Social proof section */}
        <SocialProof />
        
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
          <Newsletter />
        </Suspense>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
