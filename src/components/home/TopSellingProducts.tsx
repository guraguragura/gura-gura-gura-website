import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCurrency } from "@/hooks/useCurrency";
import { ShoppingBag } from "lucide-react";
import AddToCartButton from "@/components/product/AddToCartButton";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products = [
  {
    id: 1,
    name: "Ergonomic Office Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1560343090-f04029599c23"
  },
  {
    id: 2,
    name: "Wireless Keyboard and Mouse Combo",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589561253957-a848b799954b"
  },
  {
    id: 3,
    name: "4K Ultra HD Monitor",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  }
];

const TopSellingProducts = () => {
  const { formatPrice, isLoading } = useCurrency();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Top Selling <span className="font-normal">Products</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                </div>
                <CardContent className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                  </Link>
                  {isLoading ? (
                    <div className="animate-pulse h-6 bg-gray-200 rounded w-24"></div>
                  ) : (
                    <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                  )}
                  <AddToCartButton 
                    product={{
                      id: product.id.toString(),
                      title: product.name,
                      price: product.price,
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

export default TopSellingProducts;
