export type Category = "Roses" | "Tulips" | "Dried Flowers" | "Houseplants";
export const categories: ("All" | Category)[] = ["All", "Roses", "Tulips", "Dried Flowers", "Houseplants"];

export interface Product {
  id: string; name: string; latin: string; description: string;
  price: number; rating: number; reviews: number; category: Category;
  image: string; bestSeller?: boolean;
}

// Foto Unsplash — jika ada ID yang tidak tampil, ganti dengan foto lain (komponen sudah punya fallback).
export const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  { id: "p1", name: "Blush Garden Roses", latin: "Rosa 'David Austin'", description: "Dua belas mawar taman berkelopak lembut, dibungkus kertas krem.", price: 385000, rating: 4.9, reviews: 212, category: "Roses", image: img("photo-1561181286-d3fee7d55364"), bestSeller: true },
  { id: "p2", name: "Velvet Red Roses", latin: "Rosa 'Freedom'", description: "Klasik dan berkesan: mawar merah tua dengan batang panjang.", price: 425000, rating: 4.8, reviews: 178, category: "Roses", image: img("photo-1524386416438-98b9b2d4b433") },
  { id: "p3", name: "Spring Tulip Cloud", latin: "Tulipa gesneriana", description: "Tulip pastel segar dalam buket bulat yang ringan.", price: 295000, rating: 4.7, reviews: 96, category: "Tulips", image: img("photo-1563241527-3004b7be0ffd"), bestSeller: true },
  { id: "p4", name: "Rose Petal Tulips", latin: "Tulipa 'Barcelona'", description: "Tulip merah muda dengan tangkai hijau segar, cocok untuk hadiah.", price: 315000, rating: 4.6, reviews: 64, category: "Tulips", image: img("photo-1490750967868-88aa4486c946") },
  { id: "p5", name: "Pampas & Lavender Dry Bunch", latin: "Cortaderia selloana", description: "Buket kering tahan berbulan-bulan untuk dekorasi ruang.", price: 249000, rating: 4.8, reviews: 143, category: "Dried Flowers", image: img("photo-1508610048659-a06b669e3321"), bestSeller: true },
  { id: "p6", name: "Wild Meadow Dried Mix", latin: "Gypsophila paniculata", description: "Campuran bunga kering hangat dengan warna tanah lembut.", price: 219000, rating: 4.5, reviews: 58, category: "Dried Flowers", image: img("photo-1487530811176-3780de880c2d") },
  { id: "p7", name: "Monstera in Clay Pot", latin: "Monstera deliciosa", description: "Tanaman hias berdaun besar dengan pot terakota buatan tangan.", price: 275000, rating: 4.9, reviews: 187, category: "Houseplants", image: img("photo-1485955900006-10f4d324d411") },
  { id: "p8", name: "Peace Lily Ceramic", latin: "Spathiphyllum wallisii", description: "Mudah dirawat, menyaring udara, dengan bunga putih anggun.", price: 235000, rating: 4.6, reviews: 72, category: "Houseplants", image: img("photo-1459411552884-841db9b3cc2a") },
];

export const heroImages = [
  img("photo-1490750967868-88aa4486c946", 1200),
  img("photo-1455659817273-f96807779a8a", 1200),
  img("photo-1487530811176-3780de880c2d", 1200),
];

export const testimonials = [
  { name: "Ayu Lestari", text: "Buketnya sampai sebelum makan siang dan masih segar sekali. Ibu saya sampai menangis senang.", h: "h-56" },
  { name: "Rizky Pratama", text: "Bouquet Builder-nya menyenangkan dipakai. Hasilnya persis seperti yang saya bayangkan.", h: "h-64" },
  { name: "Dinda Kusuma", text: "Kemasannya ramah lingkungan dan rapi. Saya pesan lagi untuk wisuda adik.", h: "h-52" },
  { name: "Maya Anggraini", text: "Bunga keringnya awet dan warnanya cantik di ruang tamu.", h: "h-48" },
];

export const instagram = [
  { src: img("photo-1502977249166-824b3a8a4d6d", 600), h: "h-64" },
  { src: img("photo-1526047932273-341f2a7631f9", 600), h: "h-48" },
  { src: img("photo-1597848212624-a19eb35e2651", 600), h: "h-72" },
  { src: img("photo-1416879595882-3373a0480b5b", 600), h: "h-52" },
  { src: img("photo-1518895949257-7621c3c786d7", 600), h: "h-60" },
  { src: img("photo-1561181286-d3fee7d55364", 600), h: "h-44" },
];

export const rupiah = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
