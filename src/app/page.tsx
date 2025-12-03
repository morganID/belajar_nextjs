import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Belajar Next.js</h1>
          <p className="text-gray-600 mt-2">Silakan login untuk melanjutkan</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
