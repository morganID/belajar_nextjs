import SupabaseAuth from '@/components/SupabaseAuth'
import { useAuth } from '@/components/AuthProvider'
import Link from 'next/link'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Anda sudah login!
            </h2>
            <p className="text-green-700 mb-4">
              Selamat datang kembali, {user.email}
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Belajar Next.js</h1>
          <p className="text-gray-600 mt-2">Silakan login untuk melanjutkan</p>
        </div>
        <SupabaseAuth />
      </div>
    </main>
  )
}
