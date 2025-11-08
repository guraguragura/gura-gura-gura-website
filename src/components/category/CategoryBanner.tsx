import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryBannerProps {
  categoryHandle: string;
  categoryName: string;
}

// Placeholder images - will be replaced with actual category images
const CATEGORY_BANNERS: Record<string, string> = {
  // Add your category-specific banner images here
  // Example: "electronics": "/path/to/electronics-banner.jpg"
};

const CategoryBanner: React.FC<CategoryBannerProps> = ({ categoryHandle, categoryName }) => {
  const isMobile = useIsMobile();
  
  // Get category-specific banner or use placeholder
  const bannerImage = CATEGORY_BANNERS[categoryHandle] || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop";

  return (
    <div className="w-full mb-6">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: isMobile ? '150px' : '200px' }}>
        <img
          src={bannerImage}
          alt={`${categoryName} promotional banner`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CategoryBanner;
