
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Modern Kimono Jacket",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Outerwear"
  },
  {
    id: 2,
    name: "Minimalist Linen Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Tops"
  },
  {
    id: 3,
    name: "Sashiko Denim Pants",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "Bottoms"
  },
  {
    id: 4,
    name: "Urban Tokyo Tote",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Accessories"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our latest collection showcases the perfect blend of traditional craftsmanship and contemporary design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="font-semibold">${product.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/shop" className="inline-block border-b-2 border-black pb-1 font-medium hover:opacity-70 transition-opacity">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
