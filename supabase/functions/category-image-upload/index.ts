import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role (elevated privileges)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Parse multipart form data
    const formData = await req.formData()
    const file = formData.get('file') as File
    const categoryId = formData.get('categoryId') as string
    const categoryHandle = formData.get('categoryHandle') as string

    if (!file || !categoryId || !categoryHandle) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: file, categoryId, categoryHandle' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: 'File size must be less than 5MB' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const randomId = crypto.randomUUID().split('-')[0]
    const fileName = `category-${categoryHandle}-${timestamp}-${randomId}.${fileExt}`
    const filePath = `categories/${fileName}`

    console.log(`[INFO] Uploading file: ${filePath}, size: ${file.size}, type: ${file.type}`)

    // Upload to storage (using service role)
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('article-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('[ERROR] Storage upload failed:', uploadError)
      throw uploadError
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('article-images')
      .getPublicUrl(filePath)

    console.log(`[INFO] File uploaded successfully: ${publicUrl}`)

    // Update product_category metadata (using service role)
    const { data: category, error: fetchError } = await supabaseAdmin
      .from('product_category')
      .select('metadata')
      .eq('id', categoryId)
      .single()

    if (fetchError) {
      console.error('[ERROR] Failed to fetch category:', fetchError)
      throw fetchError
    }

    const updatedMetadata = {
      ...(category.metadata || {}),
      image: publicUrl
    }

    const { error: updateError } = await supabaseAdmin
      .from('product_category')
      .update({
        metadata: updatedMetadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', categoryId)

    if (updateError) {
      console.error('[ERROR] Failed to update category metadata:', updateError)
      throw updateError
    }

    console.log(`[INFO] Category metadata updated for ID: ${categoryId}`)

    // Log to audit_log
    await supabaseAdmin.from('audit_log').insert({
      table_name: 'product_category',
      operation: 'ADMIN_IMAGE_UPLOAD',
      new_data: { category_id: categoryId, image_url: publicUrl },
      timestamp: new Date().toISOString(),
      ip_address: req.headers.get('x-forwarded-for') || 'unknown'
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        imageUrl: publicUrl,
        message: 'Image uploaded and category updated successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('[ERROR] Function failed:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
