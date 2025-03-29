
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define the cart item interface
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  discount_price?: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const itemPrice = item.discount_price || item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  const total = subtotal; // We could add shipping, tax, etc. here

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    setIsLoading(false);
    
    // Sync with Medusa or other backend if user is logged in
    // This is where we'd integrate with the Medusa API
    const syncWithBackend = async () => {
      try {
        // Example of checking session - we would use this to sync with backend
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          console.log('User is logged in, would sync with Medusa here');
          // Here we would make API calls to sync local cart with Medusa cart
        }
      } catch (error) {
        console.error('Error syncing cart with backend:', error);
      }
    };
    
    syncWithBackend();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoading]);

  // Add item to cart
  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        
        toast.success(`${item.title} quantity updated in cart`);
        return updatedItems;
      } else {
        // Add new item
        toast.success(`${item.title} added to cart`);
        return [...currentItems, item];
      }
    });
    
    // Here we would also update the backend cart if user is logged in
    const syncItemWithBackend = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          console.log('User is logged in, would sync item with Medusa here', item);
          // API call to update Medusa cart
        }
      } catch (error) {
        console.error('Error syncing item with backend:', error);
      }
    };
    
    syncItemWithBackend();
  };

  // Update item quantity
  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    // Sync with backend
    const syncUpdateWithBackend = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          console.log(`Would update item ${id} quantity to ${quantity} in Medusa`);
          // API call to update item quantity
        }
      } catch (error) {
        console.error('Error updating item with backend:', error);
      }
    };
    
    syncUpdateWithBackend();
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`${itemToRemove.title} removed from cart`);
      }
      return currentItems.filter(item => item.id !== id);
    });
    
    // Sync with backend
    const syncRemoveWithBackend = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          console.log(`Would remove item ${id} from Medusa cart`);
          // API call to remove item
        }
      } catch (error) {
        console.error('Error removing item from backend:', error);
      }
    };
    
    syncRemoveWithBackend();
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    
    // Sync with backend
    const syncClearWithBackend = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session) {
          console.log('Would clear Medusa cart');
          // API call to clear cart
        }
      } catch (error) {
        console.error('Error clearing cart on backend:', error);
      }
    };
    
    syncClearWithBackend();
  };

  return {
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    subtotal,
    total,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    isLoading
  };
}
