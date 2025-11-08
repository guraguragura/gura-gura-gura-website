
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { Skeleton } from "@/components/ui/skeleton";

const PromotionalBanner = () => {
  const { data: banners, isLoading } = useBanners('top-selling-promo');

  if (isLoading) {
    return <Skeleton className="lg:col-span-1 h-[400px] rounded-lg" />;
  }

  if (!banners || banners.length === 0) return null;

  const banner = banners[0];
  const href = getBannerLink(banner);
  const isClickable = banner.link_type !== 'none' && href !== '#';

  return (
    <div className="lg:col-span-1 rounded-lg overflow-hidden">
      {isClickable ? (
        <Link to={href} className="block h-full">
          <img 
            src={banner.image_url} 
            alt={banner.title} 
            className="w-full h-full object-cover hover:opacity-95 transition-opacity"
          />
        </Link>
      ) : (
        <img 
          src={banner.image_url} 
          alt={banner.title} 
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default PromotionalBanner;
