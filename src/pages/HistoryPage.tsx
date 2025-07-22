
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, ShoppingCart, Heart } from "lucide-react";

const HistoryPage = () => {
  const recentlyViewed = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      image: "/placeholder.svg",
      viewedAt: "2 hours ago",
      inCart: false,
      inWishlist: true
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      image: "/placeholder.svg",
      viewedAt: "1 day ago",
      inCart: true,
      inWishlist: false
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "/placeholder.svg",
      viewedAt: "2 days ago",
      inCart: false,
      inWishlist: false
    },
    {
      id: 4,
      name: "Gaming Keyboard",
      price: 129.99,
      image: "/placeholder.svg",
      viewedAt: "3 days ago",
      inCart: false,
      inWishlist: true
    }
  ];

  const searchHistory = [
    { query: "wireless headphones", date: "Today" },
    { query: "smart watch", date: "Yesterday" },
    { query: "bluetooth speaker", date: "2 days ago" },
    { query: "gaming accessories", date: "1 week ago" },
    { query: "home decor", date: "1 week ago" }
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Clock className="h-8 w-8 text-blue-500" />
            Your Shopping History
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of products you've viewed and searches you've made
          </p>
        </div>

        {/* Recently Viewed Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Recently Viewed</h2>
            </div>
            <Button variant="outline" size="sm">
              Clear History
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.inCart && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        In Cart
                      </Badge>
                    )}
                    {product.inWishlist && (
                      <Heart className="absolute top-2 right-2 h-5 w-5 text-red-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-brand-teal">
                      RWF {(product.price * 1300).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Viewed {product.viewedAt}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      View Product
                    </Button>
                    {!product.inCart && (
                      <Button variant="outline" size="sm" className="px-3">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search History */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Search History</h2>
            <Button variant="outline" size="sm">
              Clear Searches
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {searchHistory.map((search, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium">{search.query}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{search.date}</span>
                      <Button variant="outline" size="sm">
                        Search Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Note */}
        <Card className="bg-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Privacy & Data</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your browsing history is stored locally to improve your shopping experience. 
              You can clear this data at any time using the buttons above.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HistoryPage;
