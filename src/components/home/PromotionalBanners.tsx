
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBanners, getBannerLink } from "@/hooks/useBanners";
import { Skeleton } from "@/components/ui/skeleton";

const PromotionalBanners = () => {
  const { data: banners, isLoading } = useBanners('promotional');

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (!banners || banners.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.slice(0, 2).map((banner) => {
            const href = getBannerLink(banner);
            const isClickable = banner.link_type !== 'none' && href !== '#';

            return (
              <div key={banner.id} className="rounded-lg overflow-hidden relative">
                {isClickable ? (
                  <Link to={href}>
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
          })}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
