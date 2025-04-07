
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
    image: "/lovable-uploads/7d883551-ca4e-4d2d-891b-a0f8a17496f7.png", 
    color: "bg-indigo-100" 
  },
  "kids": { 
    image: "/lovable-uploads/ee7d75cc-e5d9-43fb-9381-a969386ddab7.png", 
    color: "bg-pink-100" 
  },
  "car-accessories": { 
    image: "/lovable-uploads/ea338bf4-ab81-449c-b252-6f5c79c8bfad.png", 
    color: "bg-yellow-200" 
  },
  "10k-shop": { 
    image: "/lovable-uploads/140ba952-70e0-44c3-91c3-6464a0ba3e8b.png", 
    color: "bg-red-100" 
  },
  "home-art": { 
    image: "/lovable-uploads/155f1dc2-a1c1-4394-b43c-8513d52e943c.png", 
    color: "bg-blue-100" 
  },
  "women": { 
    image: "/lovable-uploads/95be1088-bdc1-4e5f-adf3-f3d8274a774b.png", 
    color: "bg-pink-100" 
  },
  "men": { 
    image: "/lovable-uploads/3444a916-c7fa-441c-8ac5-46fff6a723b0.png", 
    color: "bg-blue-200" 
  },
  "appliances-kitchen": { 
    image: "/lovable-uploads/92f98a77-737e-4626-8174-6622fef36bb0.png", 
    color: "bg-yellow-100" 
  },
  "phones-accessories": { 
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", 
    color: "bg-gray-100" 
  },
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
    image: "/lovable-uploads/7d883551-ca4e-4d2d-891b-a0f8a17496f7.png",
    color: "bg-indigo-100"
  },
  {
    id: "kids",
    name: "Kids & Toys",
    handle: "kids-toys",
    image: "/lovable-uploads/ee7d75cc-e5d9-43fb-9381-a969386ddab7.png",
    color: "bg-pink-100"
  },
  {
    id: "automotive",
    name: "Automotive",
    handle: "automotive",
    image: "/lovable-uploads/ea338bf4-ab81-449c-b252-6f5c79c8bfad.png",
    color: "bg-yellow-200"
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
  // First try direct match
  if (categoryImageMap[handle]) {
    return categoryImageMap[handle];
  }
  
  // Try to match with hyphenated variations
  // This helps with handles like "car-accessories" matching "car_accessories" etc.
  const normalizedHandle = handle.replace(/[-_]/g, '').toLowerCase();
  for (const [key, value] of Object.entries(categoryImageMap)) {
    const normalizedKey = key.replace(/[-_]/g, '').toLowerCase();
    if (normalizedHandle === normalizedKey) {
      return value;
    }
  }
  
  // Return default if no match
  return categoryImageMap.default;
};

// Generate random category color if none is specified
export const getRandomColor = () => {
  const colors = [
    "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-purple-100",
    "bg-red-100", "bg-indigo-100", "bg-pink-100", "bg-gray-100"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
