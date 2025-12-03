import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('🔄 OAuth Callback - Start')
  console.log('Origin:', origin)
  console.log('Code present:', !!code)
  console.log('Next URL:', next)

  if (code) {
    console.log('🔄 Exchanging code for session...')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      console.log('✅ Session exchange successful')
      console.log('User:', data.user?.email)
      console.log('Session:', !!data.session)

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      let redirectUrl: string
      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`
      } else if (forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`
      } else {
        redirectUrl = `${origin}${next}`
      }

      console.log('🔄 Redirecting to:', redirectUrl)
      return NextResponse.redirect(redirectUrl)
    } else {
      console.error('❌ Session exchange failed:', error.message)
      console.error('Error details:', error)
    }
  } else {
    console.error('❌ No authorization code received')
    console.log('Search params:', Object.fromEntries(searchParams.entries()))
  }

  // Return the user to an error page with instructions
  const errorUrl = `${origin}/auth/auth-code-error`
  console.log('🔄 Redirecting to error page:', errorUrl)
  return NextResponse.redirect(errorUrl)
}
