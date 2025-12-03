# Belajar Next.js - Supabase Authentication

Proyek Next.js lengkap dengan sistem authentication menggunakan Supabase, termasuk login dengan Email/Password dan Google OAuth.

## 🚀 Demo

Aplikasi berjalan di: http://localhost:3000

## ✨ Fitur

- ✅ **Authentication dengan Supabase**
  - Login dengan Email & Password
  - Login dengan Google OAuth
  - Registrasi user baru
  - Reset password
  - Session management otomatis
- ✅ **Protected Routes** - Dashboard hanya untuk user yang login
- ✅ **Auto Redirect** - Redirect otomatis setelah login/logout
- ✅ **Responsive Design** - UI yang responsive dengan Tailwind CSS
- ✅ **TypeScript** - Type safety penuh

## 📋 Prerequisites

- **Node.js** versi 18.17.0 atau lebih tinggi
- **Akun Supabase** dengan project yang sudah dibuat
- **Google OAuth** sudah dikonfigurasi di Supabase

## 🛠️ Setup Supabase

### 1. Buat Project Supabase

1. Pergi ke [supabase.com](https://supabase.com)
2. Buat akun baru atau login
3. Klik "New project"
4. Pilih organization dan isi detail project
5. Tunggu project selesai dibuat

### 2. Setup Google OAuth

1. Pergi ke [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project existing
3. Enable Google+ API
4. Buat OAuth 2.0 credentials:
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
5. Copy Client ID dan Client Secret

### 3. Konfigurasi Supabase Auth

1. Di Supabase Dashboard, pergi ke Authentication > Providers
2. Enable Google provider
3. Masukkan Client ID dan Client Secret dari Google
4. Simpan perubahan

### 4. Setup Environment Variables

Buat file `.env.local` di root project:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Site URL for OAuth redirects (sesuaikan dengan port yang digunakan)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Cara mendapatkan nilai-nilai ini:**
- **URL**: Di Supabase Dashboard → Settings → API → Project URL
- **Anon Key**: Di Supabase Dashboard → Settings → API → Project API keys → anon public
- **Site URL**: URL lengkap aplikasi Anda (misal: `http://localhost:3000`)

**⚠️ PENTING**: `NEXT_PUBLIC_SITE_URL` harus sesuai dengan:
1. Port yang digunakan aplikasi (3000, 3001, dll)
2. URL yang dikonfigurasi di Supabase Authentication → Providers → Google
3. Authorized redirect URIs di Google Cloud Console

## 🚀 Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Proyek

```
belajar-nextjs/
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts      # OAuth callback handler
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Protected dashboard page
│   │   ├── layout.tsx            # Root layout dengan AuthProvider
│   │   ├── page.tsx              # Home page dengan auth check
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── AuthProvider.tsx      # Authentication context provider
│       └── SupabaseAuth.tsx      # Supabase Auth UI component
├── .env.local                    # Environment variables (jangan commit)
├── next.config.js               # Next.js config
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## 🔧 Dependencies

### Production Dependencies:
- `next`: 14.0.4 - React framework
- `react`: ^18 - React library
- `react-dom`: ^18 - React DOM
- `@supabase/supabase-js`: Latest - Supabase client
- `@supabase/auth-ui-react`: Latest - Supabase Auth UI
- `@supabase/auth-ui-shared`: Latest - Shared Auth UI components

### Development Dependencies:
- `typescript`: ^5 - TypeScript
- `tailwindcss`: ^3.3.0 - CSS framework
- `@types/node`: ^20 - Node.js types
- `@types/react`: ^18 - React types
- `@types/react-dom`: ^18 - React DOM types
- `eslint`: ^8 - Linter
- `eslint-config-next`: 14.0.4 - Next.js ESLint config

## 🎯 Cara Penggunaan

1. **Login/Register**: Gunakan form di halaman utama
2. **Google Login**: Klik tombol "Continue with Google"
3. **Dashboard**: Setelah login, Anda akan diarahkan ke dashboard
4. **Logout**: Klik tombol "Logout" di dashboard

## 🐛 Troubleshooting

### Error: "Invalid login credentials"
- Pastikan email dan password sudah benar
- Untuk user baru, gunakan "Sign Up" terlebih dahulu

### Error: "OAuth callback error"
- Pastikan Google OAuth sudah dikonfigurasi dengan benar di Supabase
- Periksa Authorized redirect URIs di Google Cloud Console

### Error: "Environment variables not found"
- Pastikan file `.env.local` sudah dibuat dengan nilai yang benar
- Restart development server setelah mengubah environment variables

### Port 3000 sudah digunakan
- Next.js akan otomatis menggunakan port 3001

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/google)

## 🤝 Contributing

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

**Catatan**: Pastikan untuk tidak commit file `.env.local` ke repository karena berisi kredensial sensitif.
