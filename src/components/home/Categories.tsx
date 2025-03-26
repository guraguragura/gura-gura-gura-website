
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Women's Collection",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    link: "/collections/women"
  },
  {
    id: 2,
    name: "Men's Collection",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "/collections/men"
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    link: "/collections/accessories"
  }
];

const Categories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections crafted with attention to detail and quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="group relative block h-80 overflow-hidden rounded-lg">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-40">
                <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
