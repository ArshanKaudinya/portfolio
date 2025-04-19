import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
})

const isProd = process.env.NODE_ENV === 'production'

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url)

  if (req.method === 'POST' && pathname === '/api/reach-out') {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ??
      req.headers.get('x-real-ip') ??
      'unknown'
    const { success } = await limiter.limit(ip)
    if (!success) return new Response('Rate limit exceeded', { status: 429 })
    return NextResponse.next()
  }

  if (req.headers.get('accept')?.includes('text/html')) {
    const res   = NextResponse.next()
    const nonce = crypto.randomUUID()

    res.headers.set('x-nonce', nonce)

    const scriptSrc = [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      "https://www.gstatic.com",
      "https://*.vercel-insights.com",
      !isProd && "'unsafe-eval'",
    ]
      .filter(Boolean)
      .join(' ')

    const csp = [
      `default-src 'self'`,
      `script-src ${scriptSrc}`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      `img-src 'self' data:`,
      `connect-src 'self' https://*.supabase.co https://*.firebaseio.com https://identitytoolkit.googleapis.com https://firestore.googleapis.com https://*.vercel-insights.com https://global-fancy-12345.upstash.io`,
      `font-src 'self' https://fonts.gstatic.com`,
      `frame-src 'none'`,
      `base-uri 'none'`,
      `object-src 'none'`,
    ].join('; ')

    res.headers.set('Content-Security-Policy', csp)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/reach-out',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

