
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryFilter from "@/components/category/CategoryFilter";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";

// Import refactored components
import CategoryBreadcrumb from "@/components/category/CategoryBreadcrumb";
import CategoryHeader from "@/components/category/CategoryHeader";
import ProductListHeader from "@/components/category/ProductListHeader";
import ProductGrid from "@/components/category/ProductGrid";
import CategoryPagination from "@/components/category/CategoryPagination";

// Types
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  reviews_count: number;
  discount_price?: number;
  is_sale?: boolean;
  is_new?: boolean;
}

// Constants
const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const CategoryPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 8;
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('name')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
        } else if (categoryData) {
          setCategoryName(categoryData.name);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('product_category')
          .select('id')
          .eq('handle', handle)
          .single();

        if (categoryError) {
          console.error("Error fetching category id:", categoryError);
          setLoading(false);
          return;
        }

        if (categoryData) {
          const { data: productCategoryData, error: productCategoryError } = await supabase
            .from('product_category_product')
            .select('product_id')
            .eq('product_category_id', categoryData.id);

          if (productCategoryError) {
            console.error("Error fetching product categories:", productCategoryError);
            setLoading(false);
            return;
          }

          if (productCategoryData && productCategoryData.length > 0) {
            const productIds = productCategoryData.map(item => item.product_id);
            
            const { count, error: countError } = await supabase
              .from('product')
              .select('id', { count: 'exact' })
              .in('id', productIds);
              
            if (countError) {
              console.error("Error counting products:", countError);
            } else {
              setTotalProducts(count || 0);
            }
            
            let query = supabase
              .from('product')
              .select('id, title, description, thumbnail, metadata')
              .in('id', productIds)
              .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);
              
            switch (sortBy) {
              case "price_asc":
                query = query.order('metadata->price', { ascending: true });
                break;
              case "price_desc":
                query = query.order('metadata->price', { ascending: false });
                break;
              case "rating":
                query = query.order('metadata->rating', { ascending: false });
                break;
              case "newest":
                query = query.order('created_at', { ascending: false });
                break;
              default:
                query = query.order('metadata->popularity', { ascending: false });
            }
              
            const { data: productsData, error: productsError } = await query;
              
            if (productsError) {
              console.error("Error fetching products:", productsError);
            } else if (productsData) {
              const formattedProducts = productsData.map(product => {
                const metadataObj = product.metadata as Record<string, any> || {};
                
                return {
                  id: product.id,
                  title: product.title,
                  description: product.description || "",
                  thumbnail: product.thumbnail || "/placeholder.svg",
                  price: metadataObj.price || 0,
                  discount_price: metadataObj.discount_price,
                  rating: metadataObj.rating || 0,
                  reviews_count: metadataObj.reviews_count || 0,
                  is_sale: metadataObj.is_sale || false,
                  is_new: metadataObj.is_new || false,
                };
              });
              
              setProducts(formattedProducts);
            }
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchCategory();
      fetchProducts();
    }
  }, [handle, currentPage, sortBy]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const mockProducts: Product[] = loading ? [] : products.length > 0 ? products : Array(8).fill(null).map((_, index) => ({
    id: `mock-${index}`,
    title: "Taylor Farms Broccoli Florets Vegetables",
    description: "High-quality product with great features",
    price: 28.99,
    thumbnail: "/placeholder.svg",
    rating: 4.8,
    reviews_count: 17000,
    discount_price: 14.99,
    is_sale: index % 3 === 0,
    is_new: index % 5 === 0
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <div className="mx-auto w-[80%] bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <CategoryBreadcrumb categoryName={categoryName} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="hidden md:block">
                <CategoryHeader name={categoryName} />
                <CategoryFilter />
              </div>

              <div className="md:col-span-3">
                <div className="flex flex-col space-y-4">
                  <ProductListHeader
                    totalProducts={totalProducts || mockProducts.length}
                    currentProducts={Math.min(mockProducts.length, productsPerPage)}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOptions={sortOptions}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />

                  <ProductGrid
                    products={mockProducts}
                    viewMode={viewMode}
                    loading={loading}
                    formatPrice={formatPrice}
                  />

                  <CategoryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
