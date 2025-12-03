'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthCodeError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Error
            </h2>
            <p className="text-gray-600">
              Terjadi kesalahan saat proses authentication.
            </p>
          </div>

          {(error || errorDescription) && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <h3 className="text-sm font-medium text-red-800 mb-2">Detail Error:</h3>
              {error && <p className="text-sm text-red-700"><strong>Error:</strong> {error}</p>}
              {errorDescription && <p className="text-sm text-red-700"><strong>Description:</strong> {errorDescription}</p>}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Penyebab Umum:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• URL redirect tidak sesuai dengan konfigurasi Supabase</li>
              <li>• Google OAuth belum dikonfigurasi dengan benar</li>
              <li>• Environment variables belum diatur</li>
              <li>• Supabase project belum diaktifkan Google provider</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kembali ke Halaman Login
            </Link>

            <details className="text-sm">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                Troubleshooting Steps
              </summary>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>1. Pastikan file <code className="bg-gray-100 px-1 rounded">.env.local</code> sudah dibuat dengan nilai yang benar</p>
                <p>2. Periksa konfigurasi Google OAuth di Supabase Dashboard</p>
                <p>3. Pastikan Authorized redirect URIs di Google Cloud Console sudah benar</p>
                <p>4. Restart development server setelah mengubah environment variables</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
