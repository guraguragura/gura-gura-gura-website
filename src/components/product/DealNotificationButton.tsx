import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useDealNotifications } from '@/hooks/useDealNotifications';
import { useAuth } from '@/contexts/AuthContext';

interface DealNotificationButtonProps {
  productId: string;
  isOnSale: boolean;
}

export const DealNotificationButton: React.FC<DealNotificationButtonProps> = ({ 
  productId, 
  isOnSale 
}) => {
  const { user } = useAuth();
  const { subscribeToDeal, unsubscribeFromDeal, checkSubscription, loading } = useDealNotifications();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');

  useEffect(() => {
    if (user) {
      checkSubscription(productId).then(setIsSubscribed);
    }
  }, [productId, user]);

  const handleClick = async () => {
    if (isOnSale) return; // Don't allow subscription if already on sale

    if (isSubscribed) {
      const success = await unsubscribeFromDeal(productId);
      if (success) {
        setIsSubscribed(false);
      }
    } else {
      if (!user) {
        setShowEmailDialog(true);
      } else {
        const success = await subscribeToDeal(productId);
        if (success) {
          setIsSubscribed(true);
        }
      }
    }
  };

  const handleGuestSubscribe = async () => {
    if (!guestEmail || !guestEmail.includes('@')) {
      return;
    }

    const success = await subscribeToDeal(productId, guestEmail);
    if (success) {
      setIsSubscribed(true);
      setShowEmailDialog(false);
      setGuestEmail('');
    }
  };

  if (isOnSale) {
    return null; // Don't show button for products already on sale
  }

  return (
    <>
      <Button
        variant={isSubscribed ? "secondary" : "outline"}
        size="sm"
        onClick={handleClick}
        disabled={loading}
        className="gap-2"
      >
        {isSubscribed ? (
          <>
            <BellOff className="h-4 w-4" />
            Notifications On
          </>
        ) : (
          <>
            <Bell className="h-4 w-4" />
            Notify Me on Sale
          </>
        )}
      </Button>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Deal Notifications</DialogTitle>
            <DialogDescription>
              Enter your email to receive a notification when this product goes on sale.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGuestSubscribe();
                }
              }}
            />
            <Button 
              onClick={handleGuestSubscribe} 
              disabled={loading || !guestEmail}
              className="w-full"
            >
              Subscribe to Notifications
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
