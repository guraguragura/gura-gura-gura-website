import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface SyncRequest {
  email: string;
  action: 'subscribe' | 'unsubscribe';
  product_id?: string;
  product_title?: string;
  product_category?: string;
  user_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, action, product_id, product_title, product_category, user_id }: SyncRequest = await req.json();

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured');
    }

    if (!email) {
      throw new Error('Email is required');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log(`Syncing contact ${email} - Action: ${action}`);

    // Get all subscriptions for this email to build complete attributes
    const { data: subscriptions, error: subError } = await supabase
      .from('product_deal_subscriptions')
      .select('product_id')
      .eq('email', email);

    if (subError) {
      console.error('Error fetching subscriptions:', subError);
      throw new Error('Failed to fetch subscriptions');
    }

    // Build contact attributes
    const subscribedProducts = subscriptions?.map(s => s.product_id) || [];
    
    const attributes: Record<string, any> = {
      SUBSCRIBED_PRODUCTS: subscribedProducts,
      LAST_SUBSCRIPTION_DATE: new Date().toISOString(),
      SUBSCRIPTION_SOURCE: 'website',
      USER_STATUS: user_id ? 'authenticated' : 'guest',
      TOTAL_SUBSCRIPTIONS: subscribedProducts.length,
    };

    // Add product-specific attributes if provided
    if (product_id && action === 'subscribe') {
      attributes[`PRODUCT_${product_id}_SUBSCRIBED`] = true;
      attributes[`PRODUCT_${product_id}_SUBSCRIPTION_DATE`] = new Date().toISOString();
      if (product_title) {
        attributes[`PRODUCT_${product_id}_TITLE`] = product_title;
      }
      if (product_category) {
        attributes[`PRODUCT_${product_id}_CATEGORY`] = product_category;
      }
    } else if (product_id && action === 'unsubscribe') {
      attributes[`PRODUCT_${product_id}_SUBSCRIBED`] = false;
    }

    // Create or update contact in Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [2], // Default "Gura Deal Subscribers" list - update with your actual list ID
        updateEnabled: true,
      })
    });

    let brevoData;
    const responseText = await brevoResponse.text();
    
    try {
      brevoData = responseText ? JSON.parse(responseText) : {};
    } catch {
      brevoData = { raw: responseText };
    }

    // If contact already exists, update attributes
    if (brevoResponse.status === 400 && brevoData.code === 'duplicate_parameter') {
      console.log('Contact exists, updating attributes...');
      
      const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify({
          attributes,
          listIds: [2], // Ensure they're in the master list
        })
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.text();
        console.error('Failed to update contact:', errorData);
        throw new Error(`Failed to update contact: ${errorData}`);
      }

      brevoData = { updated: true, attributes };
    } else if (!brevoResponse.ok) {
      console.error('Brevo API error:', brevoData);
      throw new Error(`Brevo API error: ${JSON.stringify(brevoData)}`);
    }

    // Log the sync operation
    await supabase
      .from('brevo_sync_log')
      .insert({
        contact_email: email,
        sync_type: action,
        sync_status: 'success',
        contact_attributes: attributes,
        brevo_response: brevoData,
      });

    console.log(`Successfully synced contact ${email}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Contact ${action}d successfully`,
      attributes,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sync-contact-to-brevo:', error);

    // Log the failed sync
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    try {
      await supabase
        .from('brevo_sync_log')
        .insert({
          contact_email: (await req.json()).email || 'unknown',
          sync_type: (await req.json()).action || 'unknown',
          sync_status: 'failed',
          error_message: error.message,
        });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
