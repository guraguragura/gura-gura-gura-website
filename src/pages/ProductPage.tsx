
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Plus, Minus, ShoppingCart, Heart, Share, Star, Truck, ArrowLeftRight, Package } from "lucide-react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";

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

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { formatPrice } = useCurrency();

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
          // Transform the data to match the Product interface
          const formattedProduct: Product = {
            id: data.id,
            title: data.title,
            description: data.description || "",
            subtitle: data.subtitle || "",
            thumbnail: data.thumbnail || "/placeholder.svg",
            images: data.metadata?.images || [data.thumbnail || "/placeholder.svg"],
            price: data.metadata?.price || 19.99,
            discount_price: data.metadata?.discount_price,
            rating: data.metadata?.rating || 4.5,
            reviews_count: data.metadata?.reviews_count || 124,
            in_stock: data.metadata?.in_stock !== false,
            sku: data.metadata?.sku || "",
            specifications: data.metadata?.specifications || {},
            features: data.metadata?.features || [],
            is_sale: data.metadata?.is_sale || false,
            is_new: data.metadata?.is_new || false,
            variants: data.metadata?.variants || [],
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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
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
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/collections" className="hover:text-blue-500">Collections</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-gray-700">{mockProduct.title}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center h-80">
              <img 
                src={mockProduct.images?.[activeImage] || mockProduct.thumbnail} 
                alt={mockProduct.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex justify-center space-x-2 overflow-x-auto">
              {mockProduct.images?.map((image, idx) => (
                <div 
                  key={idx}
                  className={`p-2 border rounded-md cursor-pointer ${activeImage === idx ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img 
                    src={image} 
                    alt={`${mockProduct.title} - view ${idx+1}`} 
                    className="h-16 w-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Title and Badges */}
            <div className="mb-4">
              {mockProduct.is_new && (
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">
                  NEW
                </span>
              )}
              {mockProduct.is_sale && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}
              <h1 className="text-2xl font-bold mt-2">{mockProduct.title}</h1>
              {mockProduct.subtitle && (
                <p className="text-gray-600 mt-1">{mockProduct.subtitle}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= Math.round(mockProduct.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                {mockProduct.reviews_count} reviews
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">
                SKU: {mockProduct.sku || "N/A"}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {mockProduct.discount_price ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-red-500">
                    {formatPrice(mockProduct.discount_price)}
                  </span>
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {formatPrice(mockProduct.price)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">
                  {formatPrice(mockProduct.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-6">
              {mockProduct.description.split('.')[0]}.
            </p>

            {/* Variants */}
            {mockProduct.variants && mockProduct.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Available Colors:</h3>
                <div className="flex space-x-2">
                  {mockProduct.variants.map((variant, idx) => (
                    <div 
                      key={idx}
                      className="p-2 border rounded-md cursor-pointer hover:border-blue-500"
                    >
                      <img 
                        src={variant.thumbnail} 
                        alt={variant.color} 
                        className="h-12 w-12 object-contain"
                      />
                      <p className="text-xs text-center mt-1">{variant.color}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="text-gray-600"
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={incrementQuantity}
                  className="text-gray-600"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <Button 
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={addToWishlist}
                className="text-gray-600"
              >
                <Heart size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="text-gray-600"
              >
                <Share size={20} />
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-md space-y-3 mb-6">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Free shipping</p>
                  <p className="text-xs text-gray-500">For orders over $50</p>
                </div>
              </div>
              <div className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Easy returns</p>
                  <p className="text-xs text-gray-500">30 day return policy</p>
                </div>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">In stock</p>
                  <p className="text-xs text-gray-500">Ships within 1-2 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent mb-6">
            <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none">
              Reviews ({mockProduct.reviews_count})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-6">
                      {mockProduct.description}
                    </p>
                    
                    {mockProduct.features && mockProduct.features.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {mockProduct.features.map((feature, idx) => (
                            <li key={idx} className="text-gray-600">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <img 
                      src={mockProduct.images?.[1] || mockProduct.thumbnail} 
                      alt={mockProduct.title} 
                      className="w-full object-contain rounded-lg mb-4"
                    />
                    <div className="text-center text-gray-600">
                      <p>Experience the next level of innovation with {mockProduct.title}.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <table className="w-full">
                      <tbody>
                        {mockProduct.specifications && Object.entries(mockProduct.specifications).map(([key, value], idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-3 px-4 font-medium">{key}</td>
                            <td className="py-3 px-4 text-gray-600">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <img 
                      src={mockProduct.images?.[2] || mockProduct.thumbnail} 
                      alt={mockProduct.title} 
                      className="w-full object-contain rounded-lg mb-4"
                    />
                    <div className="text-center text-gray-600">
                      <p>Detailed specifications of {mockProduct.title}.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <ProductReviews 
                  productId={mockProduct.id} 
                  averageRating={mockProduct.rating} 
                  totalReviews={mockProduct.reviews_count} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <RelatedProducts productId={mockProduct.id} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
