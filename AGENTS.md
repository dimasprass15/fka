# Aturan Khusus Proyek Landing Page `lp-fka` (Next.js)

Aturan ini selalu aktif untuk seluruh pengembangan di dalam `lp-fka`:

1. **Bahasa & Deteksi Geo-IP**:
   - Mendukung 3 bahasa: **Arab (`AR` - RTL)**, **Indonesia (`ID` - LTR)**, dan **Inggris (`EN` - LTR)**.
   - **Utamakan Bahasa Arab (`AR`) di awal** sebagai default utama dan untuk pengunjung ber-IP negara Arab; otomatis sesuaikan ke `ID` jika IP dari Indonesia, dan ke `EN` jika IP dari negara berbahasa Inggris (tetap hormati pilihan manual user di cookie/storage).
2. **Database & Integrasi `SM-FK`**:
   - Gunakan **Supabase** sebagai database utama (menggantikan konfigurasi Appwrite lama maupun dummy submit) agar tersinkron *real-time* dengan aplikasi Dashboard Flutter **`SM-FK`**.
   - Jangan gunakan Google Form untuk input pendaftaran atau absensi masuk Zoom.
3. **Keamanan & Kualitas Kode**:
   - **Dilarang keras** mengekspos secret key (`SUPABASE_SERVICE_ROLE_KEY` atau secret `wa-gateway`) ke variabel `NEXT_PUBLIC_*` atau komponen client.
   - Setiap file kode **tidak boleh lebih dari 500 baris**. Pisahkan UI komponen, hooks/logic, helper functions, dan kode client/server Supabase.
4. **Konfigurasi Package Manager Windows (`pnpm`)**:
   - Pertahankan `node-linker=hoisted` di dalam `.npmrc` agar modul Next.js di `node_modules` tersimpan sebagai file fisik dan tidak rusak akibat *symlink/junction* di Windows.

