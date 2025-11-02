import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search, Clock } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useCurrency } from "@/hooks/useCurrency";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { format } from "date-fns";

const HistoryPage = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { formatPrice } = useCurrency();
  const { isInWishlist } = useWishlist();
  const { items } = useCart();

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

        {/* Recently Viewed Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recently Viewed Products</CardTitle>
              <CardDescription>Products you've looked at recently</CardDescription>
            </div>
            {recentlyViewed.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearRecentlyViewed}
              >
                Clear History
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {recentlyViewed.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No recently viewed products yet.</p>
                <p className="text-sm mt-2">Browse our catalog to see items here.</p>
                <Link to="/shop">
                  <Button className="mt-4">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentlyViewed.map((product) => {
                  const inCart = items.some(item => item.id === product.id);
                  const inWishlist = isInWishlist(product.id);
                  
                  return (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{product.title}</h3>
                        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Viewed {format(new Date(product.viewedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        {inCart && (
                          <Badge variant="default">In Cart</Badge>
                        )}
                        {inWishlist && (
                          <Badge variant="secondary">Wishlist</Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search History */}
        <Card>
          <CardHeader>
            <CardTitle>Search History</CardTitle>
            <CardDescription>Your recent searches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchHistory.map((search, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{search.query}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{search.date}</span>
                    <Button variant="outline" size="sm">
                      Search Again
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
