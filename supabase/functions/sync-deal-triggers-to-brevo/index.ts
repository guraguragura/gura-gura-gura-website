import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface DealTriggerRequest {
  product_id: string;
  product_title: string;
  product_handle: string;
  product_thumbnail?: string;
  old_price: number;
  new_price: number;
  subscriber_emails: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      product_id, 
      product_title, 
      product_handle,
      product_thumbnail,
      old_price, 
      new_price, 
      subscriber_emails 
    }: DealTriggerRequest = await req.json();

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log(`Triggering deal updates for ${subscriber_emails.length} subscribers of product ${product_id}`);

    // Calculate discount percentage
    const discountPercentage = Math.round(((old_price - new_price) / old_price) * 100);
    const productUrl = `https://wxniywyujrxlwraocszi.supabase.co/product/${product_handle || product_id}`;

    // Build deal attributes that will trigger Brevo automation
    const dealAttributes: Record<string, any> = {
      [`DEAL_${product_id}_ACTIVE`]: true,
      [`DEAL_${product_id}_DISCOUNT`]: discountPercentage,
      [`DEAL_${product_id}_OLD_PRICE`]: (old_price / 100).toFixed(2),
      [`DEAL_${product_id}_NEW_PRICE`]: (new_price / 100).toFixed(2),
      [`DEAL_${product_id}_TITLE`]: product_title,
      [`DEAL_${product_id}_URL`]: productUrl,
      [`DEAL_${product_id}_TRIGGERED_DATE`]: new Date().toISOString(),
    };

    if (product_thumbnail) {
      dealAttributes[`DEAL_${product_id}_THUMBNAIL`] = product_thumbnail;
    }

    // Batch update contacts in Brevo
    const updatePromises = subscriber_emails.map(async (email) => {
      try {
        // Get existing ACTIVE_DEALS array
        const getResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'api-key': BREVO_API_KEY
          }
        });

        let activeDealsList: string[] = [];
        
        if (getResponse.ok) {
          const contactData = await getResponse.json();
          const currentActiveDeals = contactData.attributes?.ACTIVE_DEALS;
          if (Array.isArray(currentActiveDeals)) {
            activeDealsList = currentActiveDeals;
          }
        }

        // Add this product to ACTIVE_DEALS if not already there
        if (!activeDealsList.includes(product_id)) {
          activeDealsList.push(product_id);
        }

        // Update contact attributes
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            attributes: {
              ...dealAttributes,
              ACTIVE_DEALS: activeDealsList,
              LAST_DEAL_UPDATE: new Date().toISOString(),
            }
          })
        });

        if (!updateResponse.ok) {
          const errorData = await updateResponse.text();
          console.error(`Failed to update contact ${email}:`, errorData);
          return { email, success: false, error: errorData };
        }

        // Log the sync
        await supabase
          .from('brevo_sync_log')
          .insert({
            contact_email: email,
            sync_type: 'deal_trigger',
            sync_status: 'success',
            contact_attributes: dealAttributes,
          });

        return { email, success: true };
      } catch (error) {
        console.error(`Error updating contact ${email}:`, error);
        
        // Log the failed sync
        await supabase
          .from('brevo_sync_log')
          .insert({
            contact_email: email,
            sync_type: 'deal_trigger',
            sync_status: 'failed',
            error_message: error.message,
          });

        return { email, success: false, error: error.message };
      }
    });

    const results = await Promise.all(updatePromises);
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Deal trigger sync complete: ${successCount} successful, ${failureCount} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      updated: successCount,
      failed: failureCount,
      total: subscriber_emails.length,
      results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sync-deal-triggers-to-brevo:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
