
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    const url = new URL(req.url);
    const params = url.searchParams;
    const desiredCurrency = (params.get('currency') || 'rwf').toLowerCase();
    
    // Build Medusa API query parameters
    const medusaParams = new URLSearchParams();
    
    // Handle category filtering
    if (params.get('category')) {
      medusaParams.append('category_id[]', params.get('category')!);
    }
    
    // Handle featured/sale/new filters
    if (params.get('featured') === 'true') {
      medusaParams.append('metadata[is_featured]', 'true');
    }
    if (params.get('onSale') === 'true') {
      medusaParams.append('metadata[is_sale]', 'true');
    }
    if (params.get('new') === 'true') {
      medusaParams.append('metadata[is_new]', 'true');
    }
    
    // Handle pagination
    if (params.get('limit')) {
      medusaParams.append('limit', params.get('limit')!);
    }
    if (params.get('offset')) {
      medusaParams.append('offset', params.get('offset')!);
    }

    console.log(`Fetching products from Medusa: ${MEDUSA_BACKEND_URL}/store/products?${medusaParams.toString()}`);

    // Fetch products from Medusa Store API
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/products?${medusaParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Medusa API error:', response.status, response.statusText);
      throw new Error(`Medusa API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Retrieved ${data.products?.length || 0} products from Medusa`);

    // Transform Medusa products to match frontend interface
    const transformedProducts = (data.products || []).map((product: any) => {
      const variant = product.variants?.[0];
      const prices = variant?.prices || [];
      const priceEntry = prices.find((p: any) => (p.currency_code || '').toLowerCase() === desiredCurrency) || prices[0];
      const price = priceEntry?.amount ? priceEntry.amount / 100 : 0;
      
      return {
        id: product.id,
        title: product.title,
        description: product.description || '',
        price: price,
        discount_price: product.metadata?.discount_price ? Number(product.metadata.discount_price) : undefined,
        thumbnail: product.thumbnail || product.images?.[0]?.url || "/placeholder.svg",
        images: product.images?.map((img: any) => img.url) || [product.thumbnail || "/placeholder.svg"],
        rating: Number(product.metadata?.rating) || 4.5,
        reviews_count: Number(product.metadata?.reviews_count) || 124,
        is_sale: Boolean(product.metadata?.is_sale),
        is_new: Boolean(product.metadata?.is_new),
        is_featured: Boolean(product.metadata?.is_featured),
        raw_metadata: product.metadata
      };
    });

    return new Response(JSON.stringify({
      products: transformedProducts,
      count: data.count || transformedProducts.length,
      offset: data.offset || 0,
      limit: data.limit || 20
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in medusa-products function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      products: [],
      count: 0 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
