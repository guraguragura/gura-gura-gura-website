
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
      case 'create': {
        // Create new cart in Medusa
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            region_id: body.region_id || 'reg_01HQCZYK8GH6NTV72XGT9ZQ9PT', // Default region
            email: user?.email || body.email
          })
        });

        const cartData = await response.json();
        console.log('Created cart:', cartData.cart?.id);

        return new Response(JSON.stringify(cartData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'add-item': {
        const { cart_id, variant_id, quantity } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/line-items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variant_id,
            quantity: quantity || 1
          })
        });

        const cartData = await response.json();
        console.log('Added item to cart:', cart_id);

        return new Response(JSON.stringify(cartData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'update-item': {
        const { cart_id, line_id, quantity } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/line-items/${line_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity })
        });

        const cartData = await response.json();
        console.log('Updated cart item:', line_id);

        return new Response(JSON.stringify(cartData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'remove-item': {
        const { cart_id, line_id } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}/line-items/${line_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        const cartData = await response.json();
        console.log('Removed cart item:', line_id);

        return new Response(JSON.stringify(cartData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get': {
        const { cart_id } = body;
        
        const response = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cart_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const cartData = await response.json();
        
        return new Response(JSON.stringify(cartData), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error('Error in medusa-cart function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
