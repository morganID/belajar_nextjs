'use client'

import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Login Berhasil!
              </h2>
              <p className="text-green-700">
                Selamat datang di dashboard. Anda telah berhasil login menggunakan Supabase authentication.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  Informasi User
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Provider:</strong> {user.app_metadata?.provider || 'email'}</p>
                  <p><strong>Dibuat:</strong> {new Date(user.created_at).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-md p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  Fitur Tersedia
                </h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>✅ Authentication dengan Email & Password</li>
                  <li>✅ Login dengan Google OAuth</li>
                  <li>✅ Session Management</li>
                  <li>✅ Protected Routes</li>
                  <li>✅ Auto Redirect</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Selanjutnya?
              </h3>
              <p className="text-gray-600 mb-4">
                Sekarang Anda sudah memiliki sistem authentication yang lengkap.
                Anda bisa menambahkan fitur-fitur berikut:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Database integration dengan Supabase</li>
                <li>Real-time subscriptions</li>
                <li>File upload ke Supabase Storage</li>
                <li>Role-based access control</li>
                <li>API routes dengan authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
