
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { Skeleton } from "@/components/ui/skeleton";

const CyberMondayBanner = () => {
  const { data: banners, isLoading } = useBanners('seasonal');

  if (isLoading) {
    return <Skeleton className="w-full h-[280px] my-8" />;
  }

  if (!banners || banners.length === 0) return null;

  const banner = banners[0];
  const href = getBannerLink(banner);
  const isClickable = banner.link_type !== 'none' && href !== '#';

  return (
    <div className="relative overflow-hidden my-8">
      {isClickable ? (
        <Link to={href} className="block">
          <img 
            src={banner.image_url} 
            alt={banner.title} 
            className="w-full h-[280px] object-cover hover:opacity-95 transition-opacity"
          />
        </Link>
      ) : (
        <img 
          src={banner.image_url} 
          alt={banner.title} 
          className="w-full h-[280px] object-cover"
        />
      )}
    </div>
  );
};

export default CyberMondayBanner;
