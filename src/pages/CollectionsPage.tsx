
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3X3, Layers, Star, TrendingUp } from "lucide-react";

const CollectionsPage = () => {
  const collections = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and electronic devices",
      itemCount: 1250,
      image: "/placeholder.svg",
      icon: <Grid3X3 className="h-6 w-6" />
    },
    {
      id: 2,
      name: "Fashion & Apparel",
      description: "Trendy clothing and accessories",
      itemCount: 890,
      image: "/placeholder.svg",
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Everything for your home and garden",
      itemCount: 675,
      image: "/placeholder.svg",
      icon: <Layers className="h-6 w-6" />
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      description: "Sports equipment and outdoor gear",
      itemCount: 445,
      image: "/placeholder.svg",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Collections</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of products across different categories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
                    {collection.icon}
                  </div>
                  <span className="text-sm text-gray-500">{collection.itemCount} items</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{collection.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{collection.description}</p>
                <Button className="w-full" variant="outline">
                  View Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CollectionsPage;
