
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MEDUSA_BACKEND_URL = Deno.env.get('MEDUSA_BACKEND_URL') || 'http://localhost:9000';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    let user = null;
    if (authHeader) {
      const { data } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
      user = data.user;
    }

    const { action, ...body } = await req.json();

    switch (action) {
      case 'create-payment-sessions': {
        const { cart_id } = body;
        
        // Create payment sessions for the cart
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/payment-sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('Created payment sessions for cart:', cart_id);

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'set-payment-session': {
        const { cart_id, provider_id } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/payment-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider_id })
        });

        const data = await response.json();
        console.log('Set payment session for cart:', cart_id);

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'complete-cart': {
        const { cart_id } = body;
        
        // Fetch cart data to validate before completion
        const cartResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart for validation');
        }
        
        const cartData = await cartResponse.json();
        const cart = cartData.cart;
        
        // Server-side validation: Verify all product prices against database
        if (cart.items && cart.items.length > 0) {
          for (const item of cart.items) {
            // Fetch product from Medusa to verify price
            const productResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/products/${item.variant.product_id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            });
            
            if (productResponse.ok) {
              const productData = await productResponse.json();
              const variant = productData.product.variants.find((v: any) => v.id === item.variant_id);
              
              if (variant && variant.prices) {
                const expectedPrice = variant.prices[0]?.amount || 0;
                
                // Validate that cart item price matches database price
                if (Math.abs(item.unit_price - expectedPrice) > 1) {
                  console.error('Price manipulation detected:', {
                    product_id: item.variant.product_id,
                    cart_price: item.unit_price,
                    expected_price: expectedPrice
                  });
                  
                  throw new Error('Cart validation failed: Price mismatch detected. Please refresh your cart.');
                }
              }
            }
          }
        }
        
        // If validation passes, complete the cart
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('Completed cart:', cart_id, 'after validation');

        // Send order confirmation email via Brevo
        if (data.order && user?.email) {
          try {
            await supabase.functions.invoke('send-order-confirmation', {
              body: {
                email: user.email,
                order: data.order,
                customer_name: `${body.firstName || ''} ${body.lastName || ''}`.trim()
              }
            });
          } catch (emailError) {
            console.error('Failed to send order confirmation email:', emailError);
          }
        }

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'add-shipping-address': {
        const { cart_id, address } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shipping_address: address
          })
        });

        const data = await response.json();
        console.log('Added shipping address to cart:', cart_id);

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error('Error in medusa-checkout function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
