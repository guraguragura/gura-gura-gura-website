
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3Icon, ListIcon } from "lucide-react";
import TopInfoBar from "@/components/layout/TopInfoBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import CategoryFilter from "@/components/category/CategoryFilter";
import ProductCard from "@/components/category/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";

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

interface ProductMetadata {
  price: number;
  discount_price?: number;
  rating: number;
  reviews_count: number;
  is_sale?: boolean;
  is_new?: boolean;
  popularity?: number;
}

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
        // Get the category id first
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

        // Get products in this category
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
            
            // Count total products for pagination
            const { count, error: countError } = await supabase
              .from('product')
              .select('id', { count: 'exact' })
              .in('id', productIds);
              
            if (countError) {
              console.error("Error counting products:", countError);
            } else {
              setTotalProducts(count || 0);
            }
            
            // Get products with pagination
            let query = supabase
              .from('product')
              .select('id, title, description, thumbnail, metadata')
              .in('id', productIds)
              .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);
              
            // Apply sorting
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
              // Transform the data to match the Product interface
              const formattedProducts = productsData.map(product => {
                // Parse the metadata safely
                const metadataObj = product.metadata as Record<string, any> || {};
                
                // Extract properties with defaults
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
            // No products in this category
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

  // Mock data for demonstration if no products are available
  const mockProducts: Product[] = loading ? [] : products.length > 0 ? products : Array(8).fill(null).map((_, index) => ({
    id: `mock-${index}`,
    title: "Taylor Forms Broccoli Florets Vegetables",
    description: "High-quality product with great features",
    price: 14.99,
    thumbnail: "/placeholder.svg",
    rating: 4.5,
    reviews_count: 124,
    is_sale: index % 3 === 0,
    is_new: index % 5 === 0
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopInfoBar />
      <Navbar />
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-gray-700">{categoryName || "Product Category"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left sidebar with filters */}
          <div className="hidden md:block">
            <h2 className="text-xl font-bold mb-6">{categoryName || "Product Category"}</h2>
            <CategoryFilter />
          </div>

          {/* Product grid */}
          <div className="md:col-span-3">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
                <div>
                  <span className="text-sm text-gray-500">Showing 1-{Math.min(mockProducts.length, productsPerPage)} of {totalProducts || mockProducts.length} results</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden md:flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={viewMode === "grid" ? "bg-blue-50" : ""}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3Icon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={viewMode === "list" ? "bg-blue-50" : ""}
                      onClick={() => setViewMode("list")}
                    >
                      <ListIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <select
                    className="border rounded-md px-3 py-1 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="" disabled>Sort by</option>
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array(8).fill(null).map((_, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-sm animate-pulse">
                      <div className="h-40 w-full bg-gray-200 rounded-md mb-4"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-4`}>
                  {mockProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode} 
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                      // Show first page, last page, current page, and pages around current
                      let pageNumber;
                      if (totalPages <= 7) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i < 5 ? i + 1 : (i === 5 ? "..." : totalPages);
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = i < 2 ? (i === 0 ? 1 : "...") : totalPages - (6 - i);
                      } else {
                        pageNumber = i === 0 ? 1 : i === 1 ? "..." : i === 5 ? "..." : i === 6 ? totalPages : currentPage + (i - 3);
                      }

                      return (
                        <PaginationItem key={i}>
                          {pageNumber === "..." ? (
                            <span className="py-2 px-4">...</span>
                          ) : (
                            <PaginationLink
                              onClick={() => typeof pageNumber === 'number' && setCurrentPage(pageNumber)}
                              isActive={currentPage === pageNumber}
                              className={typeof pageNumber === 'number' ? "cursor-pointer" : ""}
                            >
                              {pageNumber}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
