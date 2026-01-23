import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Use 307 redirect to preserve the method and ensure cookies are sent
      const response = NextResponse.redirect(`${origin}${next}`, {
        status: 307,
      })
      
      // Copy all cookies from cookieStore to response
      const allCookies = cookieStore.getAll()
      for (const cookie of allCookies) {
        if (cookie.name.startsWith('sb-')) {
          response.cookies.set(cookie.name, cookie.value, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365, // 1 year
          })
        }
      }
      
      return response
    }
    
    console.error('Auth callback error:', error)
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
