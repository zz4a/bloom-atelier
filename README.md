# Bloom Atelier — Flower Shop (Next.js 14)

## Setup
1. `npm install`
2. `npm run dev` lalu buka http://localhost:3000
3. Produksi: `npm run build && npm start`

## Struktur
- `app/` — layout, halaman, `globals.css` (token warna Material Design 3, light & dark)
- `components/` — Navbar, Hero, FeatureBadges, FeaturedProducts, ProductCard, BouquetBuilder, Community, Footer, ThemeProvider, CartProvider, RippleButton, Reveal
- `lib/data.ts` — data dummy produk, testimoni, feed Instagram

## Kustomisasi
- Warna: ubah variabel `--md-*` di `app/globals.css` (bagian `:root` dan `.dark`).
- Foto: ganti ID Unsplash di `lib/data.ts`. Kartu produk punya fallback ikon bila foto gagal dimuat.

## Pembayaran (dummy)
- Alur: keranjang -> isi data -> pilih QRIS / VA bank (BCA, Mandiri, BNI, BRI) -> tombol "Simulasikan pembayaran berhasil".
- Semua logika palsu ada di `lib/payment.ts`. QR hanya tampilan, tidak bisa di-scan.
- Untuk produksi: ganti `createPayment` / `confirmPayment` dengan API route ke Midtrans/Xendit, dan tandai lunas lewat webhook gateway.
