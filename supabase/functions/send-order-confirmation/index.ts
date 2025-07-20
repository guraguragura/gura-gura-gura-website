
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, order, customer_name } = await req.json();

    if (!BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY not configured');
    }

    // Format order items for email
    const orderItems = order.items?.map((item: any) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price / 100, // Convert from cents
      total: (item.unit_price * item.quantity) / 100
    })) || [];

    const orderTotal = order.total / 100; // Convert from cents
    const orderSubtotal = order.subtotal / 100;
    const orderTax = order.tax_total / 100;
    const orderShipping = order.shipping_total / 100;

    // Send order confirmation email via Brevo
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
          email: "orders@gura.store"
        },
        to: [{
          email: email,
          name: customer_name || "Customer"
        }],
        subject: `Order Confirmation - #${order.display_id}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Order Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
              .order-details { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold; }
              .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank you for your order!</h1>
                <p>Order #${order.display_id}</p>
              </div>
              
              <div class="order-details">
                <h2>Order Details</h2>
                <p><strong>Customer:</strong> ${customer_name || 'Customer'}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
                
                <h3>Items Ordered:</h3>
                ${orderItems.map((item: any) => `
                  <div class="item">
                    <div>
                      <strong>${item.title}</strong><br>
                      Quantity: ${item.quantity} × $${item.unit_price.toFixed(2)}
                    </div>
                    <div>$${item.total.toFixed(2)}</div>
                  </div>
                `).join('')}
                
                <div class="item">
                  <div>Subtotal:</div>
                  <div>$${orderSubtotal.toFixed(2)}</div>
                </div>
                <div class="item">
                  <div>Shipping:</div>
                  <div>$${orderShipping.toFixed(2)}</div>
                </div>
                <div class="item">
                  <div>Tax:</div>
                  <div>$${orderTax.toFixed(2)}</div>
                </div>
                <div class="total-row">
                  <div>Total:</div>
                  <div>$${orderTotal.toFixed(2)}</div>
                </div>
              </div>
              
              <div class="footer">
                <p>Thank you for shopping with Gura Store!</p>
                <p>You will receive a shipping confirmation email once your order is on its way.</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Brevo API error:', errorData);
      throw new Error(`Failed to send email: ${emailResponse.statusText}`);
    }

    const result = await emailResponse.json();
    console.log('Order confirmation email sent successfully:', result);

    return new Response(JSON.stringify({ success: true, messageId: result.messageId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
