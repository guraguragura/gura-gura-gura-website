import React from "react";

const ProductsSection = () => (
  <div>
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-4">Our Products</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        At Gura, we offer a diverse range of products across various categories to meet the needs of our customers:
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-orange-100">
          <img
            src="/lovable-uploads/216b1347-8cd7-4858-9487-d2409ffc6f8c.png"
            alt="Electronics"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Electronics</h3>
          <p className="text-gray-600 text-sm">
            Latest gadgets, smartphones, laptops, home appliances, and tech accessories from top brands.
          </p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-orange-100">
          <img
            src="/lovable-uploads/216b1347-8cd7-4858-9487-d2409ffc6f8c.png"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Fashion</h3>
          <p className="text-gray-600 text-sm">
            Trendy clothing, footwear, and accessories for men, women, and children.
          </p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-yellow-100">
          <img
            src="/lovable-uploads/9278bf70-688c-4830-8bcd-9790868ec069.png"
            alt="Sports & Outdoors"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Sports & Outdoors</h3>
          <p className="text-gray-600 text-sm">
            Stay fit, play hard, and explore without limits.
          </p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-pink-100">
          <img
            src="https://images.unsplash.com/photo-1607006677169-a62beb975922"
            alt="Beauty & Health"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Beauty & Health</h3>
          <p className="text-gray-600 text-sm">
            Self-care starts here—explore beauty and health favorites.
          </p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-blue-100">
          <img
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6"
            alt="Home & Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Home & Art</h3>
          <p className="text-gray-600 text-sm">
            Furniture, kitchenware, home decor, and appliances to enhance your living space.
          </p>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="h-48 bg-red-100">
          <img
            src="https://images.unsplash.com/photo-1542362567-b07e54358753"
            alt="Automotive"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Automotive</h3>
          <p className="text-gray-600 text-sm">
            Everything your car needs, all in one place.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ProductsSection;
