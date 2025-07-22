
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MedusaCartItem {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  quantity: number;
  unit_price: number;
  total: number;
  variant_id: string;
  product_id: string;
}

export interface MedusaCart {
  id: string;
  items: MedusaCartItem[];
  subtotal: number;
  total: number;
  tax_total: number;
  shipping_total: number;
  region_id: string;
  email?: string;
}

export function useMedusaCart() {
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize or get existing cart
  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);
      
      try {
        // Check if we have a cart ID in localStorage
        let cartId = localStorage.getItem('medusa_cart_id');
        
        if (cartId) {
          // Try to fetch existing cart
          const { data, error } = await supabase.functions.invoke('medusa-cart', {
            body: { action: 'get', cart_id: cartId }
          });
          
          if (error || data.error) {
            
            cartId = null;
          } else {
            setCart(data.cart);
            setIsLoading(false);
            return;
          }
        }
        
        // Create new cart if none exists
        if (!cartId) {
          const { data, error } = await supabase.functions.invoke('medusa-cart', {
            body: { action: 'create' }
          });
          
          if (error || data.error) {
            throw new Error(error?.message || data.error || 'Failed to create cart');
          }
          
          localStorage.setItem('medusa_cart_id', data.cart.id);
          setCart(data.cart);
        }
        
      } catch (err) {
        console.error('Failed to initialize cart:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize cart');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  const addItem = async (variantId: string, quantity: number = 1) => {
    if (!cart) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('medusa-cart', {
        body: {
          action: 'add-item',
          cart_id: cart.id,
          variant_id: variantId,
          quantity
        }
      });
      
      if (error || data.error) {
        throw new Error(error?.message || data.error || 'Failed to add item');
      }
      
      setCart(data.cart);
      toast.success('Item added to cart');
      
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      toast.error('Failed to add item to cart');
    }
  };

  const updateItemQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('medusa-cart', {
        body: {
          action: 'update-item',
          cart_id: cart.id,
          line_id: lineId,
          quantity
        }
      });
      
      if (error || data.error) {
        throw new Error(error?.message || data.error || 'Failed to update item');
      }
      
      setCart(data.cart);
      toast.success('Cart updated');
      
    } catch (err) {
      console.error('Failed to update cart item:', err);
      toast.error('Failed to update cart item');
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('medusa-cart', {
        body: {
          action: 'remove-item',
          cart_id: cart.id,
          line_id: lineId
        }
      });
      
      if (error || data.error) {
        throw new Error(error?.message || data.error || 'Failed to remove item');
      }
      
      setCart(data.cart);
      toast.success('Item removed from cart');
      
    } catch (err) {
      console.error('Failed to remove cart item:', err);
      toast.error('Failed to remove cart item');
    }
  };

  const clearCart = () => {
    localStorage.removeItem('medusa_cart_id');
    setCart(null);
  };

  return {
    cart,
    isLoading,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    itemCount: cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    subtotal: cart?.subtotal ? cart.subtotal / 100 : 0, // Convert from cents
    total: cart?.total ? cart.total / 100 : 0
  };
}
