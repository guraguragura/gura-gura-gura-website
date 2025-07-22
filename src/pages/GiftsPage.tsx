
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Heart, Star, Users } from "lucide-react";

const GiftsPage = () => {
  const giftCategories = [
    {
      id: 1,
      title: "For Him",
      description: "Perfect gifts for the special man in your life",
      items: 45,
      image: "/placeholder.svg",
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 2,
      title: "For Her",
      description: "Thoughtful gifts that she'll absolutely love",
      items: 52,
      image: "/placeholder.svg",
      icon: <Heart className="h-6 w-6" />
    },
    {
      id: 3,
      title: "For Kids",
      description: "Fun and educational gifts for children",
      items: 38,
      image: "/placeholder.svg",
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 4,
      title: "For Home",
      description: "Beautiful gifts for the home and family",
      items: 29,
      image: "/placeholder.svg",
      icon: <Gift className="h-6 w-6" />
    }
  ];

  const featuredGifts = [
    {
      id: 1,
      name: "Premium Gift Box",
      price: 79.99,
      image: "/placeholder.svg",
      rating: 4.8,
      category: "Luxury"
    },
    {
      id: 2,
      name: "Personalized Mug Set",
      price: 24.99,
      image: "/placeholder.svg",
      rating: 4.6,
      category: "Personal"
    },
    {
      id: 3,
      name: "Aromatherapy Set",
      price: 45.99,
      image: "/placeholder.svg",
      rating: 4.7,
      category: "Wellness"
    },
    {
      id: 4,
      name: "Book Collection",
      price: 89.99,
      image: "/placeholder.svg",
      rating: 4.9,
      category: "Educational"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Gift className="h-8 w-8 text-pink-500" />
            Gifts for Everyone
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect gift for every occasion and every person in your life
          </p>
        </div>

        {/* Gift Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-pink-600">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <Badge variant="outline">{category.items} items</Badge>
                  <Button className="w-full mt-4" variant="outline">
                    Explore Gifts
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Gifts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Gift Ideas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGifts.map((gift) => (
              <Card key={gift.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={gift.image} 
                      alt={gift.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-pink-500">
                      {gift.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{gift.name}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-brand-teal">
                      RWF {(gift.price * 1300).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600">{gift.rating}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gift Guide CTA */}
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our gift experts are here to help you find the perfect present for any occasion
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
              Get Gift Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default GiftsPage;
