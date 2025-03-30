
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import AddToCartButton from "@/components/product/AddToCartButton";
import { useCartContext } from "@/contexts/CartContext";

interface DealProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  discountPercentage: number;
}

const dealProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    oldPrice: 89.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    discountPercentage: 33
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 199.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    discountPercentage: 20
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    oldPrice: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    discountPercentage: 38
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    price: 129.99,
    oldPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    discountPercentage: 35
  }
];

const DailyDeals = () => {
  const { formatPrice, isLoading } = useCurrency();
  const { addItem } = useCartContext();

  const handleAddToCart = (product: DealProduct) => {
    addItem({
      id: product.id.toString(),
      title: product.name,
      price: product.price,
      discount_price: product.oldPrice > product.price ? product.price : undefined,
      thumbnail: product.image,
      quantity: 1
    });
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sparkles className="text-yellow-500 mr-2 h-6 w-6" />
            <h2 className="text-2xl font-bold">Daily Deals</h2>
          </div>
          <Link to="/deals" className="text-blue-600 hover:underline font-medium">
            View All Deals
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <div key={product.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                  </Link>
                  {isLoading ? (
                    <div className="animate-pulse h-6 bg-gray-200 rounded w-24"></div>
                  ) : (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-sm line-through">{formatPrice(product.oldPrice)}</span>
                    </div>
                  )}
                  <AddToCartButton 
                    product={{
                      id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      discount_price: product.oldPrice > product.price ? product.price : undefined,
                      thumbnail: product.image
                    }}
                    className="w-full mt-2"
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;
