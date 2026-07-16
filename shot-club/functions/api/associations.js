export async function onRequest(context) {
  const { request, env } = context

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=3600',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 })
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    })
  }

  // Rate limiting: 100 requests per minute per IP
  const ip = request.headers.get('cf-connecting-ip') || 'unknown'
  const key = `ratelimit:${ip}`
  const countStr = await env.RATE_LIMIT.get(key)
  const count = countStr ? parseInt(countStr) : 0

  if (count > 100) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { ...headers, 'Retry-After': '60' },
    })
  }

  await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 60 })

  try {
    // Get query params
    const url = new URL(request.url)
    const format = url.searchParams.get('format') || 'json' // 'json' or 'csv'
    const limit = parseInt(url.searchParams.get('limit')) || 1000

    // Create Supabase client
    const supabaseUrl = env.VITE_SUPABASE_URL
    const supabaseKey = env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Supabase credentials not configured' }),
        { status: 500, headers }
      )
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/clubs`, {
      method: 'GET',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch associations' }),
        { status: 500, headers }
      )
    }

    const data = await response.json()

    // Filter to active seeded clubs and limit
    const associations = data
      .filter((club) => club.is_active && club.is_seeded)
      .slice(0, limit)
      .map((club) => ({
        id: club.id,
        name: club.name,
        slug: club.slug,
        city: club.city,
        province: club.province,
        country: club.country,
        governing_body: club.governing_body,
        gender_type: club.gender_type,
        org_type: club.org_type,
        player_count: club.player_count || 0,
      }))

    // Return as CSV if requested
    if (format === 'csv') {
      const csvHeader = ['id', 'name', 'slug', 'city', 'province', 'country', 'governing_body', 'gender_type', 'org_type', 'player_count'].join(',')
      const csvRows = associations
        .map((a) =>
          [
            a.id,
            `"${a.name.replace(/"/g, '""')}"`,
            a.slug,
            a.city || '',
            a.province || '',
            a.country || '',
            a.governing_body || '',
            a.gender_type || '',
            a.org_type || '',
            a.player_count,
          ].join(',')
        )
        .join('\n')

      return new Response(`${csvHeader}\n${csvRows}`, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="associations.csv"',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }

    // Default: return JSON
    return new Response(JSON.stringify({ associations, count: associations.length }), {
      status: 200,
      headers,
    })
  } catch (err) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers,
    })
  }
}
