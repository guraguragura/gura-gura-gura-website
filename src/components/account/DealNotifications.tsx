import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useDealNotifications, DealSubscription } from '@/hooks/useDealNotifications';
import { supabase } from '@/integrations/supabase/client';
import { BellOff, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductWithSubscription extends DealSubscription {
  product?: {
    title: string;
    thumbnail: string;
    handle: string;
    metadata: any;
  };
}

export const DealNotifications: React.FC = () => {
  const { getUserSubscriptions, unsubscribeFromDeal, loading } = useDealNotifications();
  const [subscriptions, setSubscriptions] = useState<ProductWithSubscription[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    setLoadingProducts(true);
    const subs = await getUserSubscriptions();
    
    // Fetch product details for each subscription
    const subsWithProducts = await Promise.all(
      subs.map(async (sub) => {
        const { data: product } = await supabase
          .from('product')
          .select('title, thumbnail, handle, metadata')
          .eq('id', sub.product_id)
          .single();
        
        return {
          ...sub,
          product: product || undefined,
        };
      })
    );
    
    setSubscriptions(subsWithProducts);
    setLoadingProducts(false);
  };

  const handleUnsubscribe = async (productId: string) => {
    const success = await unsubscribeFromDeal(productId);
    if (success) {
      await loadSubscriptions();
    }
  };

  if (loadingProducts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deal Notifications</CardTitle>
          <CardDescription>Loading your subscriptions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deal Notifications</CardTitle>
          <CardDescription>Manage your product deal subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No subscriptions yet</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get notified when products you're interested in go on sale
            </p>
            <Link to="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Notifications</CardTitle>
        <CardDescription>
          You're subscribed to {subscriptions.length} product{subscriptions.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex items-center gap-4 p-4 border rounded-lg">
              {sub.product ? (
                <>
                  <img 
                    src={sub.product.thumbnail || '/placeholder.svg'} 
                    alt={sub.product.title}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Link 
                      to={`/product/${sub.product.handle || sub.product_id}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {sub.product.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sub.notified ? (
                        <span className="text-green-600">✓ Notified when on sale</span>
                      ) : (
                        <span>Waiting for sale</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Subscribed on {new Date(sub.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnsubscribe(sub.product_id)}
                    disabled={loading}
                  >
                    <BellOff className="h-4 w-4 mr-2" />
                    Unsubscribe
                  </Button>
                </>
              ) : (
                <div className="flex-1">
                  <p className="text-muted-foreground">Product not found</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
