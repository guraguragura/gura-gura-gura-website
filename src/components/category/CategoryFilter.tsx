import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";

const CategoryFilter = () => {
  const { handle } = useParams<{ handle: string }>();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<{name: string, handle: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        // First get the current category ID
        const { data: currentCategory, error: categoryError } = await supabase
          .from('product_category')
          .select('id, name')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching current category:", categoryError);
          setLoading(false);
          return;
        }

        if (currentCategory) {
          // Fetch subcategories using the mpath pattern matching
          // Medusa uses mpath to store hierarchical relationship
          const { data: subcategories, error: subcategoriesError } = await supabase
            .from('product_category')
            .select('id, name, handle')
            .like('mpath', `${currentCategory.id}.%`)
            .eq('is_active', true)
            .order('rank', { ascending: true });

          if (subcategoriesError) {
            console.error("Error fetching subcategories:", subcategoriesError);
            setLoading(false);
            return;
          }

          // For each subcategory, get the count of products
          const subcategoriesWithCount = await Promise.all(
            (subcategories || []).map(async (subcat) => {
              // Get product IDs for this subcategory
              const { data: productLinks, error: productLinksError } = await supabase
                .from('product_category_product')
                .select('product_id')
                .eq('product_category_id', subcat.id);

              if (productLinksError) {
                console.error(`Error fetching products for subcategory ${subcat.name}:`, productLinksError);
                return { ...subcat, count: 0 };
              }

              return {
                name: subcat.name,
                handle: subcat.handle,
                count: productLinks?.length || 0
              };
            })
          );

          setCategories(subcategoriesWithCount);
        }
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchSubcategories();
    }
  }, [handle]);

  // Fallback to mock data if no subcategories are found
  const mockCategories = [
    { name: "Mobile & Accessories", handle: "mobile-accessories", count: 32 },
    { name: "Laptop", handle: "laptop", count: 24 },
    { name: "Electronics", handle: "electronics", count: 52 },
    { name: "Smart Watch", handle: "smart-watch", count: 32 },
    { name: "Storage", handle: "storage", count: 25 },
    { name: "Portable Devices", handle: "portable-devices", count: 35 },
    { name: "Action Camera", handle: "action-camera", count: 25 },
    { name: "Smart Gadget", handle: "smart-gadget", count: 32 },
    { name: "Monitor", handle: "monitor", count: 32 },
    { name: "Smart TV", handle: "smart-tv", count: 12 },
    { name: "Camera", handle: "camera", count: 12 },
  ];

  const displayCategories = categories.length > 0 ? categories : mockCategories;

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
          {loading ? (
            // Loading state
            Array(5).fill(null).map((_, index) => (
              <li key={`loading-${index}`} className="flex justify-between items-center text-sm">
                <div className="bg-gray-200 h-4 w-28 animate-pulse rounded"></div>
                <div className="bg-gray-200 h-4 w-8 animate-pulse rounded"></div>
              </li>
            ))
          ) : (
            displayCategories.map((category) => (
              <li key={category.name} className="flex justify-between items-center text-sm">
                <Link 
                  to={`/categories/${category.handle}`}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  {category.name}
                </Link>
                <span className="text-gray-500">({category.count})</span>
              </li>
            ))
          )}
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
