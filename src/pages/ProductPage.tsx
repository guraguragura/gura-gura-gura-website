import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ShoppingCart, Heart, Share2 } from "lucide-react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";

interface ProductMetadata {
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  sku: string;
  specifications?: Record<string, string>[];
  features?: string[];
  is_sale?: boolean;
  is_new?: boolean;
  variants?: Array<{
    id: string;
    name: string;
    options: string[];
  }>;
  images?: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('product')
          .select('id, title, description, thumbnail, metadata')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        } else if (data) {
          // Parse the metadata as a Record<string, any>
          const metadataObj = data.metadata as Record<string, any> || {};
          
          // Transform the product data with safe property access
          const formattedProduct = {
            id: data.id,
            title: data.title,
            description: data.description || "",
            thumbnail: data.thumbnail || "/placeholder.svg",
            images: metadataObj.images || [data.thumbnail || "/placeholder.svg"],
            price: metadataObj.price || 0,
            discount_price: metadataObj.discount_price,
            rating: metadataObj.rating || 0,
            reviews_count: metadataObj.reviews_count || 0,
            in_stock: metadataObj.in_stock ?? true,
            sku: metadataObj.sku || "N/A",
            specifications: metadataObj.specifications || [],
            features: metadataObj.features || [],
            is_sale: metadataObj.is_sale || false,
            is_new: metadataObj.is_new || false,
            variants: metadataObj.variants || [],
          };
          
          setProduct(formattedProduct);
          setMainImage(formattedProduct.images[0]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(prev => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleImageChange = (image: string) => {
    setMainImage(image);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Product not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-gray-700">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div>
            <img src={mainImage} alt={product.title} className="w-full h-96 object-contain rounded-md shadow-md" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - ${index}`}
                  className="w-full h-24 object-cover rounded-md cursor-pointer shadow-sm hover:opacity-75 transition-opacity duration-200"
                  onClick={() => handleImageChange(image)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="text-xl font-semibold text-blue-600">{formatPrice(product.discount_price !== null && product.discount_price !== undefined ? product.discount_price : product.price)}</div>
              {product.discount_price !== null && product.discount_price !== undefined && (
                <div className="text-gray-500 ml-2 line-through">{formatPrice(product.price)}</div>
              )}
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="font-medium">Quantity:</div>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange("decrease")}>-</Button>
                <span className="px-4">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange("increase")}>+</Button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="flex items-center space-x-4 mb-6">
              <Button className="bg-blue-600 text-white rounded-md px-6 py-3 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="rounded-md px-4 py-3">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product SKU and Availability */}
            <div className="mb-6">
              <div className="text-sm text-gray-500">SKU: {product.sku}</div>
              <div className="text-sm text-gray-500">Availability: {product.in_stock ? "In Stock" : "Out of Stock"}</div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-2">
                <p className="text-gray-700">{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <ul className="list-disc pl-5 mt-4">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
              </TabsContent>
              <TabsContent value="specifications" className="mt-2">
                {product.specifications && product.specifications.length > 0 ? (
                  <ul className="list-none pl-0">
                    {product.specifications.map((spec: any, index: number) => (
                      <li key={index} className="grid grid-cols-2 gap-4 py-2 border-b">
                        <span className="font-medium text-gray-700">{spec.name}</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No specifications available.</div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Product Accordion */}
        <Accordion type="single" collapsible className="w-full mt-8">
          <AccordionItem value="details">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                More detailed information about the product can be found here. This could include
                care instructions, materials used, and origin information.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Returns</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">
                Information about shipping options, delivery times, and return policies.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger>Reviews</AccordionTrigger>
            <AccordionContent>
              <ProductReviews productId={product.id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Related Products */}
        <RelatedProducts categoryId="some_category_id" />
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
