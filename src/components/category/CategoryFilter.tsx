
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

const CategoryFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  const categories = [
    { name: "Mobile & Accessories", count: 32 },
    { name: "Laptop", count: 24 },
    { name: "Electronics", count: 52 },
    { name: "Smart Watch", count: 32 },
    { name: "Storage", count: 25 },
    { name: "Portable Devices", count: 35 },
    { name: "Action Camera", count: 25 },
    { name: "Smart Gadget", count: 32 },
    { name: "Monitor", count: 32 },
    { name: "Smart TV", count: 12 },
    { name: "Camera", count: 12 },
  ];

  const colors = [
    { name: "Black", count: 12 },
    { name: "Blue", count: 12 },
    { name: "Gray", count: 12 },
    { name: "Green", count: 12 },
    { name: "Red", count: 12 },
    { name: "White", count: 12 },
    { name: "Purple", count: 12 },
  ];

  const brands = [
    { name: "Apple", count: 32 },
    { name: "Samsung", count: 45 },
    { name: "Microsoft", count: 15 },
    { name: "HP", count: 28 },
    { name: "DELL", count: 22 },
    { name: "Redmi", count: 18 },
  ];

  const ratings = [
    { value: 5, count: 124 },
    { value: 4, count: 52 },
    { value: 3, count: 12 },
    { value: 2, count: 5 },
    { value: 1, count: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Product categories */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Product Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name} className="flex justify-between items-center text-sm">
              <span className="hover:text-blue-500 cursor-pointer">{category.name}</span>
              <span className="text-gray-500">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price slider */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="text-lg font-semibold py-0">Filter by Price</AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 px-2">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between mt-2">
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                  ${priceRange[0]}
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                  ${priceRange[1]}
                </div>
              </div>
              <button className="mt-4 bg-blue-500 text-white w-full rounded-md py-2 text-sm">
                Filter
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Rating filter */}
      <Accordion type="single" collapsible defaultValue="rating">
        <AccordionItem value="rating" className="border-0">
          <AccordionTrigger className="text-lg font-semibold py-0">Filter by Rating</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {ratings.map((rating) => (
                <div key={rating.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`rating-${rating.value}`}
                    name="rating"
                    value={rating.value}
                    checked={ratingFilter === rating.value}
                    onChange={() => setRatingFilter(rating.value)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`rating-${rating.value}`} 
                    className="flex items-center cursor-pointer text-sm flex-1"
                  >
                    <div className="flex">
                      {Array(5).fill(null).map((_, index) => (
                        <svg
                          key={index}
                          className={`h-4 w-4 ${
                            index < rating.value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500">({rating.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Color filter */}
      <Accordion type="single" collapsible defaultValue="color">
        <AccordionItem value="color" className="border-0">
          <AccordionTrigger className="text-lg font-semibold py-0">Filter by Color</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {colors.map((color) => (
                <div key={color.name} className="flex items-center">
                  <input
                    type="radio"
                    id={`color-${color.name}`}
                    name="color"
                    value={color.name}
                    checked={colorFilter === color.name}
                    onChange={() => setColorFilter(color.name)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`color-${color.name}`} 
                    className="flex justify-between items-center cursor-pointer text-sm flex-1"
                  >
                    <span>{color.name}</span>
                    <span className="text-gray-500">({color.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Brand filter */}
      <Accordion type="single" collapsible defaultValue="brand">
        <AccordionItem value="brand" className="border-0">
          <AccordionTrigger className="text-lg font-semibold py-0">Filter by Brand</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center">
                  <input
                    type="radio"
                    id={`brand-${brand.name}`}
                    name="brand"
                    value={brand.name}
                    checked={brandFilter === brand.name}
                    onChange={() => setBrandFilter(brand.name)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`brand-${brand.name}`} 
                    className="flex justify-between items-center cursor-pointer text-sm flex-1"
                  >
                    <span>{brand.name}</span>
                    <span className="text-gray-500">({brand.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
