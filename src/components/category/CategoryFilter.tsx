
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";

// Import sub-components
import CategoryList from "./filters/CategoryList";
import PriceFilter from "./filters/PriceFilter";
import RatingFilter from "./filters/RatingFilter";
import ColorFilter from "./filters/ColorFilter";
import BrandFilter from "./filters/BrandFilter";

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
          <CategoryList categories={displayCategories} loading={loading} />
        </ul>
      </div>

      {/* Filters */}
      <Accordion type="single" collapsible defaultValue="price">
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        <RatingFilter ratings={ratings} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
        <ColorFilter colors={colors} colorFilter={colorFilter} setColorFilter={setColorFilter} />
        <BrandFilter brands={brands} brandFilter={brandFilter} setBrandFilter={setBrandFilter} />
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
