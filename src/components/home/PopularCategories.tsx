
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
    color: "bg-blue-100"
  },
  {
    id: "books",
    name: "Books & Media",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    color: "bg-green-100"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
    color: "bg-yellow-100"
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    color: "bg-purple-100"
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    color: "bg-red-100"
  },
  {
    id: "beauty",
    name: "Health & Beauty",
    image: "https://images.unsplash.com/photo-1607006677169-a62beb975922",
    color: "bg-indigo-100"
  },
  {
    id: "kids",
    name: "Kids & Toys",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8",
    color: "bg-pink-100"
  },
  {
    id: "automotive",
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    color: "bg-gray-100"
  }
];

const PopularCategories = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="group block"
            >
              <div className={`rounded-lg p-4 ${category.color} transition-all duration-300 group-hover:shadow-md flex flex-col items-center text-center`}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
