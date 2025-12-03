# Belajar Next.js - Proyek dengan Form Login

Proyek Next.js sederhana yang menampilkan form login dengan styling menggunakan Tailwind CSS.

## 🚀 Demo

Aplikasi berjalan di: http://localhost:3001

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** versi 18.17.0 atau lebih tinggi
- **npm** atau **yarn** package manager

### Mengecek versi Node.js:
```bash
node --version
npm --version
```

## 🛠️ Instalasi dan Setup

### Langkah 1: Clone atau Setup Proyek

```bash
# Buat direktori baru
mkdir belajar-nextjs
cd belajar-nextjs
```

### Langkah 2: Inisialisasi package.json

Buat file `package.json` dengan dependencies berikut:

```json
{
  "name": "belajar-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

### Langkah 3: Install Dependencies

```bash
npm install
```

### Langkah 4: Setup Konfigurasi

Buat file konfigurasi berikut di root direktori:

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
```

**postcss.config.js:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Langkah 5: Buat Struktur Direktori

```bash
mkdir -p src/app src/components
```

### Langkah 6: Buat File-file Dasar

**src/app/layout.tsx:**
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Belajar Next.js',
  description: 'Proyek belajar Next.js dengan form login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**src/app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**src/app/page.tsx:**
```tsx
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
```

**src/components/LoginForm.tsx:**
```tsx
'use client'

import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi login process
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Login attempt:', { email, password })
    alert(`Login berhasil!\nEmail: ${email}`)

    setIsLoading(false)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan email Anda"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan password Anda"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sedang login...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Lupa password?
        </a>
      </div>
    </div>
  )
}
```

**next-env.d.ts:**
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

## 🚀 Menjalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` atau `http://localhost:3001` jika port 3000 sudah digunakan.

## 📦 Dependencies yang Digunakan

### Production Dependencies:
- **next**: 14.0.4 - React framework untuk production
- **react**: ^18 - Library untuk membuat UI
- **react-dom**: ^18 - React untuk DOM manipulation

### Development Dependencies:
- **@types/node**: ^20 - TypeScript types untuk Node.js
- **@types/react**: ^18 - TypeScript types untuk React
- **@types/react-dom**: ^18 - TypeScript types untuk React DOM
- **autoprefixer**: ^10.0.1 - CSS prefixing otomatis
- **eslint**: ^8 - JavaScript/TypeScript linter
- **eslint-config-next**: 14.0.4 - ESLint config untuk Next.js
- **postcss**: ^8 - CSS processing tool
- **tailwindcss**: ^3.3.0 - Utility-first CSS framework
- **typescript**: ^5 - TypeScript compiler

## 🎨 Fitur Form Login

- ✅ Input email dengan validasi
- ✅ Input password dengan masking
- ✅ State management dengan React hooks
- ✅ Loading state saat submit
- ✅ Responsive design dengan Tailwind CSS
- ✅ Form validation
- ✅ Alert konfirmasi setelah login

## 📁 Struktur Proyek

```
belajar-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Halaman utama
│   │   └── globals.css         # Global styles
│   └── components/
│       └── LoginForm.tsx       # Komponen form login
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── tsconfig.json               # TypeScript config
├── next-env.d.ts               # Next.js TypeScript types
├── package.json                # Dependencies dan scripts
└── README.md                   # Dokumentasi ini
```

## 🐛 Troubleshooting

### Port sudah digunakan:
Jika port 3000 sudah digunakan, Next.js akan otomatis menggunakan port 3001.

### Error TypeScript:
Pastikan semua file TypeScript (.tsx, .ts) sudah dibuat dengan benar.

### Tailwind CSS tidak berfungsi:
Pastikan `globals.css` sudah di-import di `layout.tsx` dan konfigurasi Tailwind sudah benar.

## 📚 Pelajari Lebih Lanjut

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
# belajar_nextjs
# belajar_nextjs
