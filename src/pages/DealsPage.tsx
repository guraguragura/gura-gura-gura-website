
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Percent, Tag } from "lucide-react";

const DealsPage = () => {
  const dailyDeals = [
    {
      id: 1,
      name: "Smartphone XY",
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: 33,
      image: "/placeholder.svg",
      timeLeft: "2h 15m",
      stock: 5
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      originalPrice: 89.99,
      salePrice: 59.99,
      discount: 33,
      image: "/placeholder.svg",
      timeLeft: "5h 30m",
      stock: 12
    },
    {
      id: 3,
      name: "Fitness Tracker",
      originalPrice: 149.99,
      salePrice: 99.99,
      discount: 33,
      image: "/placeholder.svg",
      timeLeft: "1h 45m",
      stock: 3
    }
  ];

  const weeklyDeals = [
    {
      id: 4,
      name: "Gaming Mouse",
      originalPrice: 79.99,
      salePrice: 49.99,
      discount: 38,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Tablet Pro",
      originalPrice: 399.99,
      salePrice: 299.99,
      discount: 25,
      image: "/placeholder.svg"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-yellow-500" />
            Daily Deals & Promotions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Limited time offers and amazing discounts on your favorite products
          </p>
        </div>

        {/* Daily Deals */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold">Today's Flash Deals</h2>
            <Badge variant="destructive">Limited Time</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow border-red-200">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{deal.discount}%
                    </Badge>
                    <Badge variant="outline" className="absolute top-2 right-2 bg-white">
                      {deal.stock} left
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{deal.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-red-600">
                      RWF {(deal.salePrice * 1300).toLocaleString()}
                    </span>
                    <span className="text-gray-500 line-through">
                      RWF {(deal.originalPrice * 1300).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-red-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{deal.timeLeft} left</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Grab Deal Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Deals */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Percent className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Weekly Promotions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-blue-500">
                      -{deal.discount}%
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{deal.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-brand-teal">
                      RWF {(deal.salePrice * 1300).toLocaleString()}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      RWF {(deal.originalPrice * 1300).toLocaleString()}
                    </span>
                  </div>
                  
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DealsPage;
