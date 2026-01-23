import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    
    // Track cookies that need to be set on the response
    const cookiesToSet: { name: string; value: string; options: CookieOptions }[] = []
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Track the cookie for later
            cookiesToSet.push({ name, value, options })
            // Also set on cookieStore for server-side
            try {
              cookieStore.set({ name, value, ...options })
            } catch (e) {
              // Ignore errors from cookieStore.set in route handlers
            }
          },
          remove(name: string, options: CookieOptions) {
            cookiesToSet.push({ name, value: '', options: { ...options, maxAge: 0 } })
            try {
              cookieStore.delete({ name, ...options })
            } catch (e) {
              // Ignore errors
            }
          },
        },
      }
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    console.log('Exchange code result:', { 
      hasData: !!data, 
      hasSession: !!data?.session,
      cookiesToSet: cookiesToSet.length,
      error: error?.message 
    })
    
    if (!error && data?.session) {
      // Create redirect response
      const response = NextResponse.redirect(`${origin}${next}`)
      
      // Apply all tracked cookies to the response
      for (const { name, value, options } of cookiesToSet) {
        response.cookies.set(name, value, {
          path: options.path || '/',
          secure: options.secure ?? true,
          httpOnly: options.httpOnly ?? true,
          sameSite: (options.sameSite as 'lax' | 'strict' | 'none') || 'lax',
          maxAge: options.maxAge,
        })
      }
      
      console.log('Setting cookies on response:', cookiesToSet.map(c => c.name))
      
      return response
    }
    
    console.error('Auth callback error:', error)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error?.message || 'Unknown error')}`)
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code`)
}
