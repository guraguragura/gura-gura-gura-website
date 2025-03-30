
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import { useProductDetails } from "@/hooks/useProductDetails";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetails(id);

  const addToCart = (quantity: number) => {
    console.log(`Added ${quantity} of ${product?.title} to cart`);
    // Implement cart functionality here
  };

  const addToWishlist = () => {
    console.log(`Added ${product?.title} to wishlist`);
    // Implement wishlist functionality here
  };

  // Fallback to mock data if there's an error or no product found
  const mockProduct = {
    id: "1",
    title: "Apple iPhone 14 Pro Max - 256GB - Deep Purple",
    description: "The iPhone 14 Pro Max features a stunning 6.7-inch Super Retina XDR display with ProMotion technology, an advanced camera system for incredible photos and videos, and the A16 Bionic chip, the fastest chip ever in a smartphone. Plus, it has all-day battery life and industry-leading durability features.",
    subtitle: "Latest flagship phone with advanced camera system",
    price: 1299,
    discount_price: 1199,
    thumbnail: "/placeholder.svg",
    images: Array(5).fill("/placeholder.svg"),
    rating: 4.8,
    reviews_count: 356,
    in_stock: true,
    sku: "APIP14PM-256-DP",
    specifications: {
      "Display": "6.7-inch Super Retina XDR display with ProMotion",
      "Processor": "A16 Bionic chip",
      "Storage": "256GB",
      "Camera": "48MP main, 12MP ultra wide, 12MP telephoto",
      "Front Camera": "12MP TrueDepth camera",
      "Battery": "Up to 29 hours video playback",
      "OS": "iOS 16",
      "Connectivity": "5G capable, Wi-Fi 6, Bluetooth 5.3",
      "Dimensions": "160.7 x 77.6 x 7.85 mm",
      "Weight": "240 grams"
    },
    features: [
      "A16 Bionic chip",
      "6.7-inch Super Retina XDR display with ProMotion",
      "Pro camera system with 48MP main",
      "Emergency SOS via satellite",
      "Crash Detection",
      "All-day battery life",
      "Face ID",
      "Ceramic Shield",
      "Water resistant to 6 meters for 30 minutes"
    ],
    is_sale: true,
    is_new: true,
    variants: [
      { color: "Deep Purple", price: 1299, thumbnail: "/placeholder.svg" },
      { color: "Gold", price: 1299, thumbnail: "/placeholder.svg" },
      { color: "Silver", price: 1299, thumbnail: "/placeholder.svg" },
      { color: "Space Black", price: 1299, thumbnail: "/placeholder.svg" }
    ],
    metadata: {}
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopInfoBar />
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-200 h-80 w-full rounded-lg mb-4"></div>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="h-16 w-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-20 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Use product data or fallback to mock data if there's an error
  const displayProduct = product || mockProduct;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        {/* Breadcrumb */}
        <ProductBreadcrumb title={displayProduct.title} />

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <ProductImageGallery 
            images={displayProduct.images || [displayProduct.thumbnail]} 
            title={displayProduct.title} 
          />

          {/* Product Info */}
          <ProductInfo 
            product={displayProduct} 
            onAddToCart={addToCart} 
            onAddToWishlist={addToWishlist} 
          />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={displayProduct} />

        {/* Related Products */}
        <RelatedProducts productId={displayProduct.id} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
