import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  try {
    console.log('Starting daily deal notification check...');

    // Initialize Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find products that are currently on sale
    const { data: saleProducts, error: productsError } = await supabase
      .from('product')
      .select('id, title, handle, thumbnail, metadata')
      .eq('status', 'published')
      .or('metadata->>is_sale.eq.true,metadata->>discount_price.neq.null');

    if (productsError) {
      console.error('Error fetching sale products:', productsError);
      throw new Error('Failed to fetch sale products');
    }

    if (!saleProducts || saleProducts.length === 0) {
      console.log('No sale products found');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No sale products to notify about' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    console.log(`Found ${saleProducts.length} sale products`);

    // For each sale product, check if there are unnotified subscribers
    const notifications: Promise<any>[] = [];

    for (const product of saleProducts) {
      // Check if there are subscribers who haven't been notified
      const { data: subscribers, error: subError } = await supabase
        .from('product_deal_subscriptions')
        .select('id')
        .eq('product_id', product.id)
        .eq('notified', false)
        .limit(1);

      if (subError) {
        console.error(`Error checking subscribers for product ${product.id}:`, subError);
        continue;
      }

      // If there are unnotified subscribers, sync to Brevo
      if (subscribers && subscribers.length > 0) {
        console.log(`Found unnotified subscribers for product: ${product.title}`);

        // Get all subscriber emails
        const { data: allSubscribers, error: emailsError } = await supabase
          .from('product_deal_subscriptions')
          .select('email')
          .eq('product_id', product.id)
          .eq('notified', false);

        if (emailsError || !allSubscribers) {
          console.error(`Error fetching subscriber emails for ${product.title}:`, emailsError);
          continue;
        }

        const subscriberEmails = allSubscribers.map(s => s.email);

        // Extract pricing information
        const metadata = product.metadata || {};
        const price = parseFloat(metadata.price || '0') * 100; // Convert to cents
        const discountPrice = metadata.discount_price 
          ? parseFloat(metadata.discount_price) * 100 
          : price * 0.8; // Default 20% discount if not specified

        // Call sync-deal-triggers-to-brevo to update Brevo contact attributes
        // This will trigger Brevo's automation workflows
        const notificationPromise = supabase.functions.invoke('sync-deal-triggers-to-brevo', {
          body: {
            product_id: product.id,
            product_title: product.title,
            product_thumbnail: product.thumbnail,
            product_handle: product.handle,
            old_price: price,
            new_price: discountPrice,
            subscriber_emails: subscriberEmails,
          }
        }).then(({ data, error }) => {
          if (error) {
            console.error(`Failed to sync deal triggers for ${product.title}:`, error);
            return { product: product.title, success: false, error };
          }
          
          // Mark subscribers as notified in Supabase
          supabase
            .from('product_deal_subscriptions')
            .update({ notified: true })
            .eq('product_id', product.id)
            .eq('notified', false)
            .then(({ error: updateError }) => {
              if (updateError) {
                console.error(`Error marking subscribers as notified:`, updateError);
              }
            });

          console.log(`Successfully synced deal triggers to Brevo for ${product.title}`);
          return { product: product.title, success: true, data };
        });

        notifications.push(notificationPromise);
      }
    }

    // Wait for all notifications to complete
    const results = await Promise.all(notifications);
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Daily check complete: ${successCount} successful, ${failureCount} failed`);

    return new Response(JSON.stringify({ 
      success: true,
      checked_products: saleProducts.length,
      notifications_sent: successCount,
      failures: failureCount,
      results,
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in check-deal-notifications:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
