import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('🔄 OAuth Callback - Start')
  console.log('Origin:', origin)
  console.log('Code present:', !!code)
  console.log('Error present:', !!error)
  console.log('Next URL:', next)

  // If there's an error in the URL params, redirect to error page
  if (error) {
    console.error('❌ OAuth error received:', error)
    console.error('Error description:', searchParams.get('error_description'))
    const errorUrl = `${origin}/auth/auth-code-error?error=${error}&error_description=${searchParams.get('error_description') || ''}`
    return NextResponse.redirect(errorUrl)
  }

  // If no code but no error either, check if user is already authenticated
  if (!code) {
    console.log('⚠️ No authorization code, checking existing session...')
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (session && !sessionError) {
        console.log('✅ Existing session found, redirecting to dashboard')
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    } catch (sessionCheckError) {
      console.error('❌ Session check failed:', sessionCheckError)
    }

    console.error('❌ No authorization code and no valid session')
    console.log('Search params:', Object.fromEntries(searchParams.entries()))
    const errorUrl = `${origin}/auth/auth-code-error?error=no_code`
    return NextResponse.redirect(errorUrl)
  }

  // Exchange code for session
  console.log('🔄 Exchanging code for session...')
  try {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError && data.session) {
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
      console.error('❌ Session exchange failed:', exchangeError?.message)
      console.error('Exchange error details:', exchangeError)
      const errorUrl = `${origin}/auth/auth-code-error?error=exchange_failed`
      return NextResponse.redirect(errorUrl)
    }
  } catch (exchangeException) {
    console.error('❌ Session exchange exception:', exchangeException)
    const errorUrl = `${origin}/auth/auth-code-error?error=exchange_exception`
    return NextResponse.redirect(errorUrl)
  }
}
