# 📘 Setup Lengkap Personal Finance Tracker

Panduan lengkap untuk menjalankan aplikasi Personal Finance Tracker di VS Code dengan frontend React dan backend Node.js + Google Sheets.

---

## 🎯 Arsitektur Aplikasi

```
Personal Finance Tracker
├── Frontend (React + Tailwind + Vite)
│   └── Running di http://localhost:5173
│
└── Backend (Node.js + Express + Google Sheets API)
    └── Running di http://localhost:3001
```

---

## 📦 Prasyarat

Pastikan Anda sudah install:
- **Node.js** (v18 atau lebih baru) - [Download](https://nodejs.org/)
- **pnpm** - Install dengan: `npm install -g pnpm`
- **VS Code** - [Download](https://code.visualstudio.com/)
- **Git** (opsional)

---

## 🚀 Langkah 1: Setup Frontend

### 1.1 Ekspor Project dari Figma Make

1. Di Figma Make, klik tombol **Export** atau **Download**
2. Extract file ZIP ke folder pilihan Anda (misal: `finance-tracker-frontend`)

### 1.2 Buka di VS Code

```bash
cd finance-tracker-frontend
code .
```

### 1.3 Install Dependencies

```bash
pnpm install
```

### 1.4 Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Isi file `.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 1.5 Jalankan Frontend

```bash
pnpm dev
```

Frontend akan berjalan di: **http://localhost:5173**

---

Struktur folder akhir:
```
finance-tracker-backend/
├── package.json
├── .env
├── server.js
├── config/
│   └── googleSheets.js
├── routes/
│   ├── transactions.js
│   ├── categories.js
│   ├── budgets.js
│   └── savings.js
└── services/
    └── sheetsService.js
```

### 2.3 Install Dependencies Backend

```bash
npm install
```

### 2.4 Setup Google Sheets API

Ikuti panduan lengkap di `BACKEND_CODE_SETUP.md` bagian **Setup Google Sheets API**.

**Ringkasan:**
1. Buat Google Cloud Project
2. Aktifkan Google Sheets API
3. Buat Service Account & download JSON credentials
4. Buat Google Sheets dengan 4 sheets:
   - Transactions
   - Categories
   - Budgets
   - Savings
5. Share spreadsheet dengan service account email


### 2.6 Jalankan Backend

```bash
npm run dev
```

Backend akan berjalan di: **http://localhost:3001**

---

## 🧪 Langkah 4: Testing

### 4.1 Test Backend API

Gunakan Postman atau curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Get transactions
curl http://localhost:3001/api/transactions
```

### 4.2 Test Frontend

1. Buka browser: http://localhost:5173
2. Coba tambah transaksi baru
3. Cek Google Sheets - data harus muncul
4. Refresh browser - data harus tetap ada (di-load dari Google Sheets)

---

## 📁 Struktur Project Lengkap

```
finance-tracker/
│
├── frontend/                          # Frontend React
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx               # Main app component
│   │   │   └── components/           # React components
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Transactions.tsx
│   │   │       ├── Budget.tsx
│   │   │       ├── SavingsGoals.tsx
│   │   │       ├── Categories.tsx
│   │   │       └── AddTransactionModal.tsx
│   │   ├── services/
│   │   │   └── api.ts                # API service
│   │   └── styles/
│   │       ├── theme.css
│   │       └── fonts.css
│   ├── package.json
│   ├── .env
│   └── vite.config.ts
│
└── backend/                           # Backend Node.js
    ├── config/
    │   └── googleSheets.js           # Google Sheets config
    ├── routes/
    │   ├── transactions.js           # Transactions API
    │   ├── categories.js             # Categories API
    │   ├── budgets.js                # Budgets API
    │   └── savings.js                # Savings API
    ├── services/
    │   └── sheetsService.js          # Sheets service class
    ├── server.js                     # Express server
    ├── package.json
    └── .env
```

---

## 🎨 Fitur Aplikasi

### 1. Dashboard
- Overview total income & expense
- Chart pengeluaran per kategori
- Recent transactions
- Budget progress
- Savings goals progress

### 2. Transaksi
- List semua transaksi
- Filter by category & type
- Add/Edit/Delete transaksi
- Tampil dengan emoji kategori

### 3. Budget
- Set budget per kategori
- Progress bar visual
- Warning jika over budget
- Add/Edit/Delete budget

### 4. Target Tabungan
- Set target tabungan dengan deadline
- Progress tracking
- Visual progress bar
- Add/Update/Delete goals

### 5. Kategori
- Manage custom categories
- Income vs Expense categories
- Custom emoji untuk setiap kategori
- Add/Delete categories

---

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke Backend

**Solusi:**
1. Pastikan backend running di http://localhost:3001
2. Cek file `.env` frontend, pastikan `VITE_API_URL=http://localhost:3001/api`
3. Restart frontend: `pnpm dev`

### Google Sheets API Error

**Solusi:**
1. Pastikan Google Sheets API sudah diaktifkan di Google Cloud Console
2. Pastikan spreadsheet sudah di-share dengan service account email
3. Cek format `GOOGLE_PRIVATE_KEY` di `.env`, pastikan ada `\n` untuk newlines
4. Pastikan `GOOGLE_SHEETS_ID` benar (ambil dari URL spreadsheet)

### CORS Error

**Solusi:**
Backend sudah menggunakan `cors()` middleware. Jika masih ada error:
1. Pastikan backend running
2. Restart backend
3. Clear browser cache

### Data tidak muncul setelah refresh

**Solusi:**
1. Cek console browser untuk error
2. Cek Google Sheets apakah data tersimpan
3. Pastikan `useEffect` di App.tsx sudah benar
4. Test API endpoint dengan Postman

---

## 📊 Google Sheets Setup Detail

### 1. Transactions Sheet

| ID | Name | Amount | Category | Type | Date | Emoji |
|----|------|--------|----------|------|------|-------|
| uuid1 | Gaji Bulanan | 8000000 | Pemasukan | income | 2026-05-01 | 💰 |
| uuid2 | Makan Siang | 50000 | Food & Beverage | expense | 2026-05-23 | 🍔 |

### 2. Categories Sheet

| ID | Name | Emoji | Type |
|----|------|-------|------|
| uuid1 | Pemasukan | 💰 | income |
| uuid2 | Food & Beverage | 🍔 | expense |

### 3. Budgets Sheet

| ID | CategoryID | Amount | Period |
|----|------------|--------|--------|
| uuid1 | uuid2 | 2000000 | monthly |

### 4. Savings Sheet

| ID | Name | TargetAmount | CurrentAmount | Emoji | Deadline |
|----|------|--------------|---------------|-------|----------|
| uuid1 | Liburan Bali | 10000000 | 3500000 | 🏖️ | 2026-12-31 |

---

## 🚀 Deploy ke Production (Opsional)

### Frontend (Vercel/Netlify)

```bash
pnpm build
# Upload folder dist/ ke Vercel atau Netlify
```

Update `.env` di production:
```env
VITE_API_URL=https://your-backend-api.com/api
```

### Backend (Railway/Render/Heroku)

1. Push code ke GitHub
2. Connect repository ke platform hosting
3. Set environment variables di hosting platform
4. Deploy

---

## 📝 Next Steps

Setelah setup berhasil, Anda bisa:

1. **Customize tampilan** - Edit Tailwind classes di components
2. **Tambah fitur** - Export to PDF, Email reports, dll
3. **Add authentication** - Login dengan Google OAuth
4. **Mobile app** - Convert ke React Native
5. **Dashboard analytics** - Tambah lebih banyak charts
6. **Recurring transactions** - Auto-add transaksi bulanan
7. **Multi-currency** - Support berbagai mata uang

---

## 🎉 Selesai!

Aplikasi Personal Finance Tracker Anda siap digunakan!

**Frontend:** http://localhost:5173  
**Backend:** http://localhost:3001  
**Data:** Google Sheets

Selamat mengelola keuangan! 💰📊🎯
