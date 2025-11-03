
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RelatedProducts from "@/components/product/RelatedProducts";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

const ProductPage = () => {
  const { productId, id, handle } = useParams<{ 
    productId?: string; 
    id?: string; 
    handle?: string; 
  }>();
  
  // Use whichever parameter is available
  const productKey = productId || id || handle;
  const { product, loading, error } = useProductDetails(productKey);
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Track product view when product loads
  useEffect(() => {
    if (product && !loading) {
      addToRecentlyViewed({
        id: product.id,
        title: product.title,
        price: product.discount_price || product.price,
        thumbnail: product.thumbnail || '/placeholder.svg'
      });
    }
  }, [product, loading, addToRecentlyViewed]);

  const addToCart = (quantity: number) => {
    
    // Implement cart functionality here
  };

  const addToWishlist = () => {
    
    // Implement wishlist functionality here
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

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopInfoBar />
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/shop" className="text-primary hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displayProduct = product;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        {/* Breadcrumb */}
        <ProductBreadcrumb 
          title={displayProduct.title} 
          categoryName={displayProduct.categoryName}
          categoryHandle={displayProduct.categoryHandle}
        />

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

        {/* Recommended Products from Same Category */}
        {displayProduct.category_id && (
          <div className="max-w-[1200px] mx-auto">
            <RecommendedProducts 
              categoryId={displayProduct.category_id} 
              currentProductId={displayProduct.id}
            />
          </div>
        )}

        {/* Related Products - Now with improved responsive layout */}
        <div className="max-w-[1200px] mx-auto">
          <RelatedProducts productId={displayProduct.id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
