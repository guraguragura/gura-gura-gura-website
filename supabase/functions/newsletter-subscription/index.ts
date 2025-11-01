import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source = 'website' }: NewsletterRequest = await req.json();

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Valid email address is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Initialize Supabase client for rate limiting
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check rate limit (10 requests per hour per IP)
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { data: rateLimitCheck, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        p_endpoint: 'newsletter-subscription',
        p_max_requests: 10,
        p_window_minutes: 60
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    } else if (rateLimitCheck === false) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }


    // Check if email already exists in our database
    const { data: existingSubscription } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    // Add to Brevo contact list
    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not configured');
      throw new Error('Email service not configured');
    }

    // Add contact to Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        attributes: {
          FIRSTNAME: email.split('@')[0], // Use email prefix as firstname if no name provided
          SOURCE: source,
          SUBSCRIBED_AT: new Date().toISOString(),
        },
        listIds: [1], // Add to list ID 1 (you may need to adjust this based on your Brevo setup)
        updateEnabled: true, // Update contact if it already exists
      }),
    });

    const brevoData = await brevoResponse.json();
    
    if (!brevoResponse.ok && brevoResponse.status !== 400) {
      // 400 is expected if contact already exists
      console.error('Brevo API error:', brevoData);
      throw new Error('Failed to add contact to email service');
    }

    // Save to Supabase (if not already exists)
    if (!existingSubscription) {
      const { error: supabaseError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ 
          email: email.toLowerCase(),
          source,
          brevo_contact_id: brevoData.id || null
        }]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        // Don't throw error here - Brevo subscription is more important
      }
    }

    // Send welcome email via Brevo
    const welcomeEmailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Gura Team',
          email: 'noreply@gura.store'
        },
        to: [{
          email: email.toLowerCase(),
          name: email.split('@')[0]
        }],
        subject: 'Welcome to Gura Newsletter! 🎉',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to Gura! 🛒</h1>
              <p style="color: #6b7280; font-size: 16px;">Thank you for subscribing to our newsletter</p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin-bottom: 15px;">What to expect:</h2>
              <ul style="color: #4b5563; line-height: 1.6;">
                <li>🆕 Latest product launches and collections</li>
                <li>💰 Exclusive discounts and promotional offers</li>
                <li>🎯 Personalized product recommendations</li>
                <li>📦 Order updates and delivery notifications</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://gura.store" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Start Shopping Now
              </a>
            </div>
            
            <div style="text-align: center; color: #9ca3af; font-size: 14px; margin-top: 30px;">
              <p>You're receiving this email because you subscribed to Gura newsletter.</p>
              <p>
                <a href="https://gura.store/privacy" style="color: #6b7280;">Privacy Policy</a> |
                <a href="https://gura.store/terms" style="color: #6b7280;">Terms of Service</a>
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!welcomeEmailResponse.ok) {
      console.error('Failed to send welcome email:', await welcomeEmailResponse.text());
      // Don't throw error - subscription was successful
    }

    console.log('Newsletter subscription successful:', {
      email: email.toLowerCase(),
      source,
      brevoContactExists: brevoResponse.status === 400,
      welcomeEmailSent: welcomeEmailResponse.ok
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: existingSubscription 
          ? 'You are already subscribed to our newsletter!' 
          : 'Successfully subscribed! Check your email for a welcome message.',
        alreadySubscribed: !!existingSubscription
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to subscribe to newsletter. Please try again.',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);