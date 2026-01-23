import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // If there's an error from Supabase, redirect to error page
  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error_description || error)}`)
  }

  // If no code, just redirect to home (session might already be in cookies)
  if (!code) {
    console.log('No code provided, redirecting to home')
    return NextResponse.redirect(`${origin}${next}`)
  }

  // Create response for redirect
  const response = NextResponse.redirect(`${origin}${next}`)
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              httpOnly: false,
              secure: true,
              sameSite: 'lax',
            })
          })
        },
      },
    }
  )

  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
  
  if (exchangeError) {
    console.error('Exchange error:', exchangeError.message)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(exchangeError.message)}`)
  }

  console.log('Session created for:', data?.user?.email)
  return response
}
