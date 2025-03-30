import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

const trendingProducts = [
  {
    id: 1,
    name: "Leather Wallet with RFID Protection",
    price: 39.99,
    oldPrice: 59.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf0c",
    badge: "Trending",
    category: "Accessories"
  },
  {
    id: 2,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    oldPrice: 34.99,
    image: "https://images.unsplash.com/photo-1523374430953-5c93594175c3",
    badge: "Eco-Friendly",
    category: "Home & Lifestyle" 
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1560343090-f04029e8221c",
    badge: "Best Seller",
    category: "Office"
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 29.99,
    oldPrice: 49.99,
    image: "https://images.unsplash.com/photo-1584394432314-d2599ca8a955",
    badge: "Tech",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 19.99,
    oldPrice: 29.99,
    image: "https://images.unsplash.com/photo-1585584384543-c7a8a57ca693",
    badge: "Sustainable",
    category: "Fashion"
  },
  {
    id: 6,
    name: "Aromatherapy Diffuser",
    price: 44.99,
    oldPrice: 64.99,
    image: "https://images.unsplash.com/photo-1598515220547-09060534f5ca",
    badge: "Relaxation",
    category: "Home & Lifestyle"
  }
];

const TrendingPurchasesWithPromo = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Trending <span className="font-normal">Purchases</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full aspect-square object-cover" 
                />
                {product.badge && (
                  <div className="absolute top-2 left-2 rounded-md px-2 py-1 text-xs font-medium text-white bg-emerald-500">
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100">
                  <Heart className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              
              <div className="p-3">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <h3 className="font-medium text-sm mb-2 line-clamp-1">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  {isLoading ? (
                    <div className="animate-pulse h-5 bg-gray-200 rounded w-16"></div>
                  ) : (
                    <>
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-sm line-through">{formatPrice(product.oldPrice)}</span>
                    </>
                  )}
                </div>
                
                <AddToCartButton 
                  product={{
                    id: product.id.toString(),
                    title: product.name,
                    price: product.price,
                    discount_price: product.oldPrice ? product.price : undefined,
                    thumbnail: product.image
                  }}
                  className="w-full flex items-center justify-center gap-2 size-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPurchasesWithPromo;
