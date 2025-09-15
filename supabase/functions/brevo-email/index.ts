
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscriptionRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  listIds?: number[];
}

interface TransactionalEmailRequest {
  to: string;
  templateId: number;
  params?: Record<string, any>;
  subject?: string;
}

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    const apiKey = Deno.env.get("BREVO_API_KEY");
    
    if (!apiKey) {
      throw new Error("Brevo API key not configured");
    }

    const brevoHeaders = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    let result;

    switch (action) {
      case "subscribe":
        result = await handleNewsletterSubscription(data as NewsletterSubscriptionRequest, brevoHeaders);
        break;
      
      case "sendTransactional":
        result = await handleTransactionalEmail(data as TransactionalEmailRequest, brevoHeaders);
        break;
      
      case "sendContact":
        result = await handleContactEmail(data as ContactEmailRequest, brevoHeaders);
        break;
      
      default:
        throw new Error("Invalid action specified");
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in Brevo function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function handleNewsletterSubscription(
  data: NewsletterSubscriptionRequest,
  headers: Record<string, string>
) {
  const { email, firstName, lastName, listIds = [2] } = data; // Default list ID 2

  const contactData = {
    email,
    attributes: {
      FIRSTNAME: firstName || "",
      LASTNAME: lastName || "",
    },
    listIds,
    updateEnabled: true,
  };

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo subscription error:", error);
    throw new Error(`Failed to subscribe: ${error}`);
  }

  return { success: true, message: "Successfully subscribed to newsletter" };
}

async function handleTransactionalEmail(
  data: TransactionalEmailRequest,
  headers: Record<string, string>
) {
  const { to, templateId, params, subject } = data;

  const emailData = {
    to: [{ email: to }],
    templateId,
    params: params || {},
    ...(subject && { subject }),
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo transactional email error:", error);
    throw new Error(`Failed to send email: ${error}`);
  }

  const result = await response.json();
  return { success: true, messageId: result.messageId };
}

async function handleContactEmail(
  data: ContactEmailRequest,
  headers: Record<string, string>
) {
  const { name, email, message, subject = "New Contact Form Submission" } = data;

  const emailData = {
    sender: { name: "Gura Website", email: "noreply@gura.rw" },
    to: [{ email: "support@gura.rw" }],
    subject,
    htmlContent: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    replyTo: { email },
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo contact email error:", error);
    throw new Error(`Failed to send contact email: ${error}`);
  }

  const result = await response.json();
  return { success: true, messageId: result.messageId };
}

serve(handler);
