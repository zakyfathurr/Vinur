# VINUR — Belajar Angka untuk Semua

Aplikasi pembelajaran numerasi untuk anak autisme (ASD), dirancang dengan prinsip **ABA** (Prompt → Response → Reinforcement) dan antarmuka yang *sensory-friendly*. Orang tua mendaftar, anak belajar mengenal angka lewat 5 stage (masing-masing 6 level), dan progres tersimpan permanen di database.

Proyek tugas mata kuliah **Interaksi Manusia & Komputer (IMK)** — ITS.

---

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | React 19 + Vite 5 + Tailwind CSS 3 |
| Backend | Node.js + Express |
| Database | PostgreSQL 16 |
| Auth | JWT + bcryptjs (password di-hash) |
| Infrastruktur | Docker & Docker Compose |

---

## Prasyarat

Pastikan sudah terpasang:

- **Node.js** ≥ 22.11 dan npm — [unduh](https://nodejs.org)
- **Docker Desktop** (untuk backend + database) — [unduh](https://www.docker.com/products/docker-desktop)

Cek instalasi:

```bash
node -v
docker --version
docker compose version
```

---

## Setup & Menjalankan

Aplikasi terdiri dari **2 bagian**: backend (API + database, jalan di Docker) dan frontend (React, jalan lokal). Jalankan keduanya.

### 1. Clone & masuk folder

```bash
git clone <url-repo>
cd Vinur
```

### 2. Jalankan Backend + Database (Docker)

> Pastikan **Docker Desktop sudah berjalan** terlebih dahulu.

```bash
docker compose up --build -d
```

Perintah ini menjalankan:
- **PostgreSQL** di port `5432` (skema tabel otomatis dibuat saat pertama kali jalan)
- **API server** di port `4000`

Cek backend sudah hidup:

```bash
curl http://localhost:4000/api/health
# Harusnya membalas: {"ok":true}
```

### 3. Jalankan Frontend (React)

Di terminal terpisah, dari folder root proyek:

```bash
npm install        # cukup sekali di awal
npm run dev
```

Buka **http://localhost:5173** di browser.

### 4. Coba aplikasinya

1. Klik **Daftar sekarang** → isi email & password (min. 8 karakter) → isi profil anak → **Mulai Belajar!** (akun dibuat di database).
2. Main minimal satu stage.
3. **Refresh halaman** — Anda tetap login dan progres tetap tersimpan. ✅
4. Buka **Settings** (klik avatar / tab Settings di Dashboard) untuk mengedit profil atau **Logout**.

---

## Variabel Lingkungan (Environment)

Sudah ada nilai default yang langsung jalan untuk pengembangan lokal. Untuk kustomisasi, salin file contoh:

**Frontend** (root) — `.env`:
```bash
cp .env.example .env
```
```env
VITE_API_URL=http://localhost:4000
```

**Backend** — `server/.env` (hanya diperlukan jika menjalankan backend tanpa Docker):
```bash
cp server/.env.example server/.env
```
```env
PORT=4000
DATABASE_URL=postgres://vinur:vinur@localhost:5432/vinur
JWT_SECRET=ganti-dengan-string-acak-panjang
CORS_ORIGIN=http://localhost:5173
```

> Saat memakai Docker Compose, variabel backend sudah diset di `docker-compose.yml` (tidak perlu `server/.env`).

---

## Perintah Berguna

```bash
# Frontend
npm run dev            # dev server (http://localhost:5173)
npm run build          # build produksi ke dist/
npm run lint           # cek ESLint

# Backend / Docker
docker compose up --build -d     # start backend + database
docker compose down              # stop (tambah -v untuk hapus data database)
docker compose logs -f api       # lihat log API
docker compose ps                # status container
docker compose exec db psql -U vinur -d vinur   # buka shell PostgreSQL
```

---

## API Endpoints

Base URL: `http://localhost:4000/api` — autentikasi via header `Authorization: Bearer <token>`.

| Method | Path | Auth | Keterangan |
|---|---|---|---|
| GET | `/health` | — | Cek server hidup |
| POST | `/register` | — | Daftar akun + profil anak, balikan `{token, user}` |
| POST | `/login` | — | Login, balikan `{token, user, progress}` |
| GET | `/me` | ✅ | Profil + progres user saat ini |
| PUT | `/profile` | ✅ | Update nama & tanggal lahir anak |
| PUT | `/progress/:stageId` | ✅ | Simpan progres sebuah stage (upsert) |

---

## Struktur Proyek

```
Vinur/
├── docker-compose.yml      # orkestrasi backend + database
├── src/                    # frontend React
│   ├── api.js              # client API (fetch + JWT)
│   ├── App.jsx             # state machine layar + sesi
│   ├── components/         # LoginForm, Register, Menu, GameScreen, Dashboard, dll.
│   └── data/stages.js      # definisi 5 stage × 6 level (statis)
└── server/                 # backend Express
    ├── Dockerfile
    ├── db/schema.sql       # skema tabel (users, stage_progress)
    └── src/
        ├── index.js        # route API
        ├── db.js           # koneksi PostgreSQL
        └── auth.js         # hash password + JWT
```

**Skema database**: `users` (akun orang tua + profil anak) dan `stage_progress` (satu baris per user+stage). Konten soal (STAGES) tetap di frontend, database hanya menyimpan akun & progres.

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `curl health` gagal / frontend tak bisa login | Pastikan Docker Desktop jalan & `docker compose ps` menunjukkan `api` + `db` running |
| "Tidak dapat terhubung ke server" di UI | Backend belum jalan — jalankan `docker compose up -d` |
| Port 4000/5432/5173 sudah dipakai | Hentikan proses lain, atau ubah port di `docker-compose.yml` / `vite.config.js` |
| Ingin mengosongkan database | `docker compose down -v` lalu `docker compose up --build -d` |
| Ganti `.env` tapi tidak terbaca | Restart `npm run dev` (Vite membaca `.env` saat start) |

---

## Catatan

- Ini proyek akademik: tanpa email verification / refresh-token / rate-limit. JWT berlaku 7 hari.
- Satu anak per akun (sesuai alur UI saat ini).
