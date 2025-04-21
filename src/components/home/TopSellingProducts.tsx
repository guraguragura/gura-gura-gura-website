
import React from "react";
import { useCurrency } from "@/hooks/useCurrency";
import NavigationControls from "./top-selling/NavigationControls";
import PromotionalBanner from "./top-selling/PromotionalBanner";
import ProductCard from "./top-selling/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const TopSellingProducts = () => {
  const { formatPrice, isLoading: currencyLoading } = useCurrency();
  const { products, isLoading: productsLoading } = useProducts({ 
    limit: 4,
    // You can add more filters here like featured: true
  });
  
  const isLoading = currencyLoading || productsLoading;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <NavigationControls 
          title="Top Selling"
          subtitle="Products"
          linkUrl="/shop"
          linkText="View All Products"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Promotional Banner */}
          <PromotionalBanner />
          
          {/* Product Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading ? (
              // Loading Skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={`loading-${index}`} className="border rounded-lg p-4 space-y-3">
                  <Skeleton className="w-full h-40 rounded-md" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-4 rounded" />
                  <Skeleton className="w-full h-8 rounded" />
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={{
                    id: parseInt(product.id),
                    name: product.title,
                    price: product.price,
                    oldPrice: product.discount_price ? product.price : product.price * 1.2, // Fallback for display
                    image: product.thumbnail || "/placeholder.svg",
                    badge: product.is_new ? 'New' : product.is_sale ? 'Sale' : null,
                    rating: product.rating || 4.5,
                    reviewsCount: product.reviews_count || 0
                  }}
                  formatPrice={formatPrice}
                  isLoading={isLoading}
                />
              ))
            ) : (
              <div className="lg:col-span-4 flex items-center justify-center text-gray-500 py-12">
                No products available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
