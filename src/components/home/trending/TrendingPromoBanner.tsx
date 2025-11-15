
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingPromoBanner = () => {
  const { data: banners, isLoading } = useBanners('trending-promo');

  if (isLoading) {
    return <Skeleton className="lg:col-span-1 h-[300px] rounded-lg" />;
  }

  if (!banners || banners.length === 0) return null;

  const banner = banners[0];
  const href = getBannerLink(banner);
  const isClickable = banner.link_type !== 'none' && href !== '#';

  return (
    <div className="lg:col-span-1 rounded-lg overflow-hidden relative group">
      <img 
        src={banner.image_url} 
        alt={banner.title} 
        className="w-full h-full object-cover"
      />
      {isClickable && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6">
          <Link to={href}>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 shadow-lg transform group-hover:scale-105 transition-transform"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TrendingPromoBanner;
