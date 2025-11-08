import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { product_id, product_title, product_thumbnail, old_price, new_price, product_handle } = await req.json();

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured');
    }

    // Initialize Supabase client with service role to bypass RLS
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get all subscribers for this product who haven't been notified
    const { data: subscriptions, error: subError } = await supabase
      .from('product_deal_subscriptions')
      .select('*')
      .eq('product_id', product_id)
      .eq('notified', false);

    if (subError) {
      console.error('Error fetching subscriptions:', subError);
      throw new Error('Failed to fetch subscriptions');
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No subscribers to notify' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Found ${subscriptions.length} subscribers for product ${product_id}`);

    // Calculate discount percentage
    const discountPercentage = Math.round(((old_price - new_price) / old_price) * 100);

    // Product URL
    const productUrl = `https://wxniywyujrxlwraocszi.supabase.co/product/${product_handle || product_id}`;

    // Send email to each subscriber
    const emailPromises = subscriptions.map(async (subscription) => {
      try {
        const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            sender: {
              name: "Gura Store",
              email: "deals@gura.store"
            },
            to: [{
              email: subscription.email,
            }],
            subject: `🔥 ${product_title} is now on sale! ${discountPercentage}% OFF`,
            htmlContent: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <title>Deal Alert</title>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
                  .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; }
                  .header h1 { margin: 0; font-size: 28px; }
                  .badge { display: inline-block; background: #ff4444; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
                  .product-section { padding: 30px; }
                  .product-image { width: 100%; max-width: 300px; height: auto; border-radius: 8px; margin: 0 auto; display: block; }
                  .product-title { font-size: 24px; font-weight: bold; margin: 20px 0 10px; text-align: center; }
                  .price-section { text-align: center; margin: 20px 0; }
                  .old-price { color: #999; text-decoration: line-through; font-size: 20px; }
                  .new-price { color: #ff4444; font-size: 32px; font-weight: bold; margin: 0 10px; }
                  .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
                  .cta-button:hover { opacity: 0.9; }
                  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                  .unsubscribe { color: #999; font-size: 12px; margin-top: 10px; }
                  .unsubscribe a { color: #667eea; text-decoration: none; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🎉 Your Watched Item is On Sale!</h1>
                    <span class="badge">${discountPercentage}% OFF</span>
                  </div>
                  
                  <div class="product-section">
                    <img src="${product_thumbnail || 'https://placehold.co/600x400'}" alt="${product_title}" class="product-image">
                    
                    <h2 class="product-title">${product_title}</h2>
                    
                    <div class="price-section">
                      <span class="old-price">$${(old_price / 100).toFixed(2)}</span>
                      <span class="new-price">$${(new_price / 100).toFixed(2)}</span>
                    </div>
                    
                    <div style="text-align: center;">
                      <a href="${productUrl}" class="cta-button">Shop Now →</a>
                    </div>
                    
                    <p style="text-align: center; color: #666; margin-top: 20px;">
                      Hurry! This deal won't last forever. Get it while supplies last!
                    </p>
                  </div>
                  
                  <div class="footer">
                    <p>Thank you for shopping with Gura Store!</p>
                    <p class="unsubscribe">
                      You received this email because you subscribed to notifications for this product.<br>
                      <a href="${productUrl}">Click here to manage your notification preferences</a>
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `
          })
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.text();
          console.error(`Failed to send email to ${subscription.email}:`, errorData);
          return { email: subscription.email, success: false };
        }

        return { email: subscription.email, success: true };
      } catch (error) {
        console.error(`Error sending email to ${subscription.email}:`, error);
        return { email: subscription.email, success: false };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;

    console.log(`Sent ${successCount}/${subscriptions.length} emails successfully`);

    // Mark all subscriptions as notified
    const { error: updateError } = await supabase
      .from('product_deal_subscriptions')
      .update({ notified: true })
      .eq('product_id', product_id)
      .eq('notified', false);

    if (updateError) {
      console.error('Error updating subscriptions:', updateError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      notified: successCount,
      total: subscriptions.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in notify-deal-subscribers:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
