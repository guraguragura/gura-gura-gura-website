/**
 * ShopPage Component
 * 
 * IMPORTANT: This component fetches products from the database.
 * DO NOT add hardcoded product data here. All products must come from Supabase.
 */

import React from "react";
import { Helmet } from "react-helmet";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, Star } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCurrency } from "@/hooks/useCurrency";
import { Skeleton } from "@/components/ui/skeleton";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const { products, isLoading: productsLoading, error } = useProducts({ limit: 20 });
  const { formatPrice, isLoading: currencyLoading } = useCurrency();
  
  const isLoading = productsLoading || currencyLoading;

  return (
    <>
      <Helmet>
        <title>Shop All Products | Gura</title>
        <meta name="description" content="Discover thousands of products at great prices on Gura" />
      </Helmet>
      <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Shop</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of products at great prices
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(12).fill(null).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-24 mb-3" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Unable to load products. Please try again later.</p>
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          )}
          
          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      {product.is_sale && product.discount_price && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                      {product.is_new && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.discount_price || product.price)}
                          </span>
                          {product.discount_price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">
                              {product.rating.toFixed(1)} ({product.reviews_count})
                            </span>
                          </div>
                        )}
                      </div>
                      <AddToCartButton 
                        product={{
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          discount_price: product.discount_price,
                          thumbnail: product.thumbnail
                        }}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
    </>
  );
};

export default ShopPage;
