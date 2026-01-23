"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import type { User as SupabaseUser, SupabaseClient } from "@supabase/supabase-js"

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function AuthButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)
  
  const supabase = useMemo<SupabaseClient | null>(() => {
    if (typeof window !== 'undefined' && isSupabaseConfigured()) {
      return createClient()
    }
    return null
  }, [])

  useEffect(() => {
    // Check if Supabase is configured
    setIsConfigured(isSupabaseConfigured())
    
    if (!supabase) {
      setLoading(false)
      return
    }

    // Handle OAuth callback from URL hash (for implicit flow)
    const handleAuthCallback = async () => {
      // Check if there's auth data in the URL hash
      if (window.location.hash && window.location.hash.includes('access_token')) {
        console.log('Found access_token in URL hash, processing...')
        // Supabase will automatically handle the hash and set the session
        const { data, error } = await supabase.auth.getSession()
        if (data?.session) {
          console.log('Session restored from URL hash:', data.session.user.email)
          setUser(data.session.user)
          // Clean up the URL hash
          window.history.replaceState(null, '', window.location.pathname)
        }
        if (error) {
          console.error('Error processing auth callback:', error)
        }
      }
    }
    
    handleAuthCallback()

    // Get initial session
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignIn = async () => {
    if (!supabase) return
    // Use implicit flow - redirect back to current page, Supabase will handle session via URL hash
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        skipBrowserRedirect: false,
      },
    })
  }

  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }

  // Don't render if Supabase is not configured
  if (!isConfigured) {
    return null
  }

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <span className="animate-pulse">Loading...</span>
      </Button>
    )
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignIn} className="gap-2">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.user_metadata?.full_name || "User avatar"}
            />
            <AvatarFallback>
              {user.user_metadata?.full_name?.[0]?.toUpperCase() ||
                user.email?.[0]?.toUpperCase() ||
                <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.user_metadata?.full_name && (
              <p className="font-medium">{user.user_metadata.full_name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
