# SIKAP PAS — Paket Persiapan Server

Paket ini menyiapkan fondasi server API untuk tahap integrasi SIKAP PAS. **Ini bukan hosting online yang sudah aktif dan belum tersambung ke HTML V1.4.** Server baru tersedia setelah dipasang pada komputer/server milik organisasi atau penyedia hosting.

## Isi paket
- `server.js`: API login, data, pengguna, dan audit log.
- `bootstrap-admin.js`: membuat akun Admin Pengamanan pertama secara lokal/terkendali.
- `Dockerfile` dan `docker-compose.yml`: menjalankan API dalam container dengan penyimpanan data persisten.
- `.env.example`: contoh konfigurasi lingkungan.

## Opsi pemasangan
### A. Uji coba di komputer sendiri
Butuh Node.js 20+.
1. Ekstrak folder.
2. Salin `.env.example` menjadi `.env`.
3. Atur `JWT_SECRET` dengan string acak rahasia minimal 32 karakter. Jangan gunakan contoh ini.
4. Jalankan `npm install`.
5. Buat folder `data` jika belum ada.
6. Buat admin pertama: `node bootstrap-admin.js NAMA_ADMIN 'PASSWORD_RAHASIA_MINIMAL_12'`.
7. Jalankan `npm start`.
8. Periksa `http://localhost:3000/api/health`.

### B. Jalankan melalui Docker pada server/VPS
Butuh server yang dikelola organisasi atau akun penyedia hosting, akses terminal, serta domain/konfigurasi HTTPS.
1. Pasang Docker Engine dan Docker Compose pada server.
2. Salin folder proyek ke server melalui cara yang disetujui organisasi.
3. Salin `.env.example` menjadi `.env`; ubah `JWT_SECRET` dan `CORS_ORIGIN` ke origin frontend yang benar. Jangan masukkan rahasia ke repositori publik.
4. Bangun dan jalankan: `docker compose up -d --build`.
5. Buat admin pertama di container: `docker compose exec sikap-pas-api node bootstrap-admin.js NAMA_ADMIN 'PASSWORD_RAHASIA_MINIMAL_12'`.
6. Endpoint API terikat ke `127.0.0.1:3000`; letakkan reverse proxy yang dikonfigurasi dengan HTTPS di depannya. Jangan membuka port API mentah ke internet.
7. Uji endpoint health melalui alamat HTTPS setelah reverse proxy siap.

## Environment
- `PORT`: port internal API (default 3000).
- `JWT_SECRET`: rahasia token, minimal 32 karakter dan harus unik.
- `CORS_ORIGIN`: origin frontend yang diizinkan, bukan URL API. Pisahkan beberapa origin dengan koma.
- `DB_PATH`: lokasi database SQLite. Dalam Docker, gunakan `/data/sikap-pas.sqlite` agar data disimpan pada volume.

## API utama
- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/me` (Bearer token)
- `GET /api/records?type=...`
- `POST /api/records`
- `DELETE /api/records/:id` (Admin Pengamanan)
- `GET/POST /api/admin/users` (Admin Pengamanan)
- `GET /api/admin/audit` (Admin Pengamanan)

## Sebelum digunakan untuk data operasional
- HTML V1.4 belum terhubung ke API ini; frontend harus diubah dan diuji.
- Ini belum merupakan audit keamanan atau deployment produksi yang disetujui.
- Gunakan HTTPS, akun unik, password kuat, akses server terbatas, backup terenkripsi dan uji pemulihan.
- Tinjau kebijakan penyimpanan dan akses data dengan pengelola TI/keamanan organisasi. Hindari memasukkan data sensitif ke lingkungan uji.
- SQLite cocok untuk prototipe/satu instance; kebutuhan multi-instance atau skala lebih besar perlu desain database/server tersendiri.
- Jangan mengandalkan CORS sebagai pengganti autentikasi dan otorisasi.


Skrip `bootstrap-regu.js` membuat akun Admin Regu pertama untuk Regu I-IV; gunakan username berbeda dan password unik minimal 12 karakter. Jangan gunakan password contoh dalam penggunaan nyata.
