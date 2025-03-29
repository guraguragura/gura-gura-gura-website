
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";

interface Product {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  price: number;
  discount_price?: number;
  thumbnail: string;
  images?: string[];
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  sku?: string;
  specifications?: Record<string, any>;
  features?: string[];
  is_sale?: boolean;
  is_new?: boolean;
  variants?: any[];
}

interface ProductMetadata {
  images?: string[];
  price?: number;
  discount_price?: number;
  rating?: number;
  reviews_count?: number;
  in_stock?: boolean;
  sku?: string;
  specifications?: Record<string, any>;
  features?: string[];
  is_sale?: boolean;
  is_new?: boolean;
  variants?: any[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from('product')
          .select('*, product_category_product(product_category_id, product_category:product_category(name, handle))')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
        } else if (data) {
          // Cast metadata to the correct type
          const metadata = data.metadata as ProductMetadata || {};
          
          // Transform the data to match the Product interface
          const formattedProduct: Product = {
            id: data.id,
            title: data.title,
            description: data.description || "",
            subtitle: data.subtitle || "",
            thumbnail: data.thumbnail || "/placeholder.svg",
            images: metadata.images || [data.thumbnail || "/placeholder.svg"],
            price: metadata.price || 19.99,
            discount_price: metadata.discount_price,
            rating: metadata.rating || 4.5,
            reviews_count: metadata.reviews_count || 124,
            in_stock: metadata.in_stock !== false,
            sku: metadata.sku || "",
            specifications: metadata.specifications || {},
            features: metadata.features || [],
            is_sale: metadata.is_sale || false,
            is_new: metadata.is_new || false,
            variants: metadata.variants || [],
          };
          
          setProduct(formattedProduct);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (quantity: number) => {
    console.log(`Added ${quantity} of ${product?.title} to cart`);
    // Implement cart functionality here
  };

  const addToWishlist = () => {
    console.log(`Added ${product?.title} to wishlist`);
    // Implement wishlist functionality here
  };

  // Mock product data if not loaded from database
  const mockProduct: Product = product || {
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
    ]
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        {/* Breadcrumb */}
        <ProductBreadcrumb title={mockProduct.title} />

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <ProductImageGallery 
            images={mockProduct.images || [mockProduct.thumbnail]} 
            title={mockProduct.title} 
          />

          {/* Product Info */}
          <ProductInfo 
            product={mockProduct} 
            onAddToCart={addToCart} 
            onAddToWishlist={addToWishlist} 
          />
        </div>

        {/* Product Tabs */}
        <ProductTabs product={mockProduct} />

        {/* Related Products */}
        <RelatedProducts productId={mockProduct.id} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
