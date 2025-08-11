// Supabase Edge Function: order-tracking-lookup
// Returns sanitized delivery-only tracking data for a given customer-facing order number (display_id)
// - Public (no JWT) with DB-level rate limiting via RPC
// - No payment fields returned
// - CORS enabled

// Deno + Supabase client
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Map internal statuses to delivery-only labels for UI
const DELIVERY_STATUS_LABELS: Record<string, string> = {
  processing: 'Processing',
  ready_for_pickup: 'Ready for pickup',
  assigned_to_driver: 'Driver assigned',
  picked_up: 'Picked up',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  failed_delivery: 'Delivery attempt failed',
  cancelled: 'Cancelled',
  canceled: 'Cancelled',
}

function buildSteps(current: string, history: Array<{ new_status?: string; created_at?: string }> = []) {
  const deliveryStatuses = [
    'processing',
    'ready_for_pickup',
    'assigned_to_driver',
    'picked_up',
    'out_for_delivery',
    'delivered',
    'failed_delivery',
    'cancelled',
  ]

  const orderedHistory = history
    .filter((h) => h.new_status && deliveryStatuses.includes(h.new_status))
    .sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''))

  const currentIndex = Math.max(
    0,
    deliveryStatuses.findIndex((s) => s === current) // -1 -> 0
  )

  return deliveryStatuses.map((s, i) => {
    const label = DELIVERY_STATUS_LABELS[s] || s
    const hist = orderedHistory.find((h) => h.new_status === s)
    return {
      title: label,
      completed: i < currentIndex,
      current: i === currentIndex,
      date: hist?.created_at || undefined,
    }
  })
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderNumber } = await req.json().catch(() => ({ orderNumber: '' }))

    if (!orderNumber || typeof orderNumber !== 'string' || orderNumber.length < 3) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid order number' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // Simple rate limiting via RPC
    const { data: allowed, error: rlError } = await supabase
      .rpc('check_rate_limit', { p_endpoint: 'order-tracking-lookup', p_max_requests: 60, p_window_minutes: 10 })

    if (rlError) {
      console.error('Rate limit RPC error:', rlError)
    }
    if (allowed === false) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Fetch order by customer-facing display_id
    const { data: order, error: orderErr } = await supabase
      .from('order')
      .select(
        [
          'id',
          'display_id',
          'status',
          'unified_status',
          'metadata',
          'created_at',
          'assigned_at',
          'picked_up_at',
          'delivered_at',
          'failed_delivery_at',
          'cancelled_at',
        ].join(', ')
      )
      .eq('display_id', orderNumber)
      .maybeSingle()

    if (orderErr) {
      console.error('Order lookup error:', orderErr)
      return new Response(
        JSON.stringify({ success: false, error: 'Error fetching order' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    if (!order) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Fetch status history (for timeline)
    const { data: history } = await supabase
      .from('order_status_history')
      .select('new_status, created_at')
      .eq('order_id', order.id)
      .order('created_at', { ascending: true })

    // Optional: failed delivery attempts
    const { data: attempts } = await supabase
      .from('delivery_attempts')
      .select('status, attempted_at')
      .eq('order_id', order.id)
      .order('attempted_at', { ascending: true })

    const unified = order.unified_status || order.status || 'processing'
    const steps = buildSteps(unified, history || [])

    const deliveryAddr = order.metadata?.delivery_address || null

    const response = {
      success: true,
      data: {
        orderNumber: order.display_id,
        status: DELIVERY_STATUS_LABELS[unified] || unified,
        estimatedDelivery: order.delivered_at ? order.delivered_at : null,
        currentLocation:
          unified === 'out_for_delivery'
            ? 'On the way to your address'
            : unified === 'picked_up'
            ? 'In transit from warehouse'
            : unified === 'assigned_to_driver'
            ? 'Awaiting pickup by driver'
            : 'Processing at warehouse',
        steps,
        attempts: (attempts || []).map((a) => ({
          status: a.status,
          attempted_at: a.attempted_at,
        })),
        deliveryAddress: deliveryAddr
          ? {
              address: deliveryAddr.address || deliveryAddr.address_1 || '',
              address_2: deliveryAddr.address_2 || '',
              city: deliveryAddr.city || '',
              district: deliveryAddr.district || deliveryAddr.province || '',
              postal_code: deliveryAddr.postal_code || '',
              country_code: deliveryAddr.country_code || 'RW',
              geocoded_address: deliveryAddr.geocoded_address || '',
              latitude: deliveryAddr.latitude || null,
              longitude: deliveryAddr.longitude || null,
            }
          : null,
      },
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (e) {
    console.error('order-tracking-lookup error', e)
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
