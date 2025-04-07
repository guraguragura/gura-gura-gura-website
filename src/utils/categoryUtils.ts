
// Mapping of category handles to image URLs and colors
export const categoryImageMap: Record<string, {image: string, color: string}> = {
  "electronics": { 
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03", 
    color: "bg-blue-100" 
  },
  "books": { 
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", 
    color: "bg-green-100" 
  },
  "home-kitchen": { 
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6", 
    color: "bg-yellow-100" 
  },
  "fashion": { 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", 
    color: "bg-purple-100" 
  },
  "sports-outdoors": { 
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b", 
    color: "bg-red-100" 
  },
  "health-beauty": { 
    image: "https://images.unsplash.com/photo-1607006677169-a62beb975922", 
    color: "bg-indigo-100" 
  },
  "kids-toys": { 
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8", 
    color: "bg-pink-100" 
  },
  "automotive": { 
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753", 
    color: "bg-gray-100" 
  },
  "10k-shop": { 
    image: "/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png", 
    color: "bg-red-100" 
  },
  "home-art": { 
    image: "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png", 
    color: "bg-blue-100" 
  },
  // Default for any category not in the mapping
  "default": { 
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc", 
    color: "bg-gray-100" 
  }
};

// Fallback static categories to use when no DB categories are available
export const staticCategories = [
  {
    id: "electronics",
    name: "Electronics",
    handle: "electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03",
    color: "bg-blue-100"
  },
  {
    id: "books",
    name: "Books & Media",
    handle: "books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    color: "bg-green-100"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    handle: "home-kitchen",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
    color: "bg-yellow-100"
  },
  {
    id: "fashion",
    name: "Fashion",
    handle: "fashion",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    color: "bg-purple-100"
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    handle: "sports-outdoors",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    color: "bg-red-100"
  },
  {
    id: "beauty",
    name: "Health & Beauty",
    handle: "health-beauty",
    image: "https://images.unsplash.com/photo-1607006677169-a62beb975922",
    color: "bg-indigo-100"
  },
  {
    id: "kids",
    name: "Kids & Toys",
    handle: "kids-toys",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8",
    color: "bg-pink-100"
  },
  {
    id: "automotive",
    name: "Automotive",
    handle: "automotive",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    color: "bg-gray-100"
  },
  {
    id: "home-art",
    name: "Home & Art",
    handle: "home-art",
    image: "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png",
    color: "bg-blue-100"
  }
];

// Get category image and color
export const getCategoryStyle = (handle: string) => {
  const category = categoryImageMap[handle] || categoryImageMap.default;
  return category;
};

// Generate random category color if none is specified
export const getRandomColor = () => {
  const colors = [
    "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-purple-100",
    "bg-red-100", "bg-indigo-100", "bg-pink-100", "bg-gray-100"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
