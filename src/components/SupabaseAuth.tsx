'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './AuthProvider'

export default function SupabaseAuth() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (user) {
    return (
      <div className="text-center">
        <p className="text-green-600 mb-4">Login berhasil! Mengalihkan...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login dengan Supabase
      </h2>

      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#3b82f6',
                brandAccent: '#2563eb',
              },
              space: {
                spaceSmall: '4px',
                spaceMedium: '8px',
                spaceLarge: '16px',
                labelBottomMargin: '8px',
                anchorBottomMargin: '4px',
                emailInputSpacing: '4px',
                socialAuthSpacing: '4px',
                buttonPadding: '10px 15px',
                inputPadding: '10px 15px',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '1px',
              },
              radii: {
                borderRadiusButton: '4px',
                buttonBorderRadius: '4px',
                inputBorderRadius: '4px',
              },
            },
          },
          className: {
            container: 'auth-container',
            button: 'auth-button',
            input: 'auth-input',
            label: 'auth-label',
            message: 'auth-message',
            anchor: 'auth-link',
          },
        }}
        providers={['google']}
        redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
        onlyThirdPartyProviders={false}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Masuk',
              loading_button_label: 'Sedang masuk...',
              social_provider_text: 'Masuk dengan {{provider}}',
              link_text: 'Sudah punya akun? Masuk',
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Daftar',
              loading_button_label: 'Sedang mendaftar...',
              social_provider_text: 'Daftar dengan {{provider}}',
              link_text: 'Belum punya akun? Daftar',
            },
            forgotten_password: {
              email_label: 'Email',
              button_label: 'Kirim instruksi reset',
              loading_button_label: 'Mengirim...',
              link_text: 'Lupa password?',
            },
          },
        }}
      />
    </div>
  )
}
