
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3, Layers, Star, TrendingUp, ShoppingBag, Gift } from "lucide-react";
import { useCollections } from "@/hooks/useCollections";

const getCollectionIcon = (title: string) => {
  switch (title) {
    case "10K Shop":
      return <ShoppingBag className="h-6 w-6" />;
    case "This Week's Deals":
      return <Star className="h-6 w-6" />;
    case "Sports & Outdoors":
      return <TrendingUp className="h-6 w-6" />;
    case "Perfect for Gifting":
      return <Gift className="h-6 w-6" />;
    case "Customer Top Picks":
      return <Grid3X3 className="h-6 w-6" />;
    case "Back to School":
      return <Layers className="h-6 w-6" />;
    default:
      return <Grid3X3 className="h-6 w-6" />;
  }
};

const getCollectionDescription = (title: string) => {
  switch (title) {
    case "10K Shop":
      return "Premium products under 10,000 RWF";
    case "This Week's Deals":
      return "Special discounts and limited-time offers";
    case "Sports & Outdoors":
      return "Sports equipment and outdoor gear";
    case "Perfect for Gifting":
      return "Thoughtfully curated gifts for every occasion";
    case "Customer Top Picks":
      return "Most loved products chosen by our customers";
    case "Back to School":
      return "Everything you need for the new school year";
    default:
      return "Discover amazing products in this collection";
  }
};

const CollectionsPage = () => {
  const { collections, loading, error } = useCollections();

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Collections</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of products across different categories
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading collections: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getCollectionIcon(collection.title)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {collection.productCount} {collection.productCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{collection.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {getCollectionDescription(collection.title)}
                  </p>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`/collections/${collection.handle}`}>
                      View Collection
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CollectionsPage;
