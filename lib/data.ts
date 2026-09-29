export type Category =
  | "Roses"
  | "Tulips"
  | "Dried Flowers"
  | "Houseplants" ;

export const categories: ("All" | Category)[] = [
  "All",
  "Roses",
  "Tulips",
  "Dried Flowers",
  "Houseplants",
];

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
  { id: "p9", name: "Blush Peony Bouquet", latin: "Paeonia lactiflora", description: "Peony lembut berkelopak penuh dalam buket romantis bernuansa pastel.", price: 450000, rating: 4.9, reviews: 124, category: "Roses", image: "https://images.unsplash.com/photo-1560582591-f6939a30b5f2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb255JTIwYm91cXVldHxlbnwwfHwwfHx8MA%3D%3D", bestSeller: true },
  { id: "p10", name: "Blue Hydrangea Cloud", latin: "Hydrangea macrophylla", description: "Buket hydrangea biru lembut dengan bunga besar dan tampilan elegan.", price: 365000, rating: 4.8, reviews: 91, category: "Tulips", image: "https://images.unsplash.com/photo-1623201530307-c1d678f68459?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "p11", name: "Golden Sunflower Bouquet", latin: "Helianthus annuus", description: "Bunga matahari cerah dengan nuansa hangat untuk hadiah yang cheerful.", price: 285000, rating: 4.8, reviews: 116, category: "Roses", image: "https://images.unsplash.com/photo-1543409777-30250849aa3e?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", bestSeller: true },
  { id: "p12", name: "White Lily Elegance", latin: "Lilium candidum", description: "Lily putih anggun dengan aroma lembut, cocok untuk momen spesial.", price: 335000, rating: 4.7, reviews: 83, category: "Tulips", image: "https://images.unsplash.com/photo-1674784708705-4667d407cc65?q=80&w=741&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "p13", name: "Pastel Gerbera Mix", latin: "Gerbera jamesonii", description: "Campuran gerbera pastel yang cerah dan playful untuk berbagai kesempatan.", price: 265000, rating: 4.7, reviews: 77, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1783676515560-08e403a5eb15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGFzdGVsJTIwR2VyYmVyYSUyME1peHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: "p14", name: "Soft Pink Carnations", latin: "Dianthus caryophyllus", description: "Anyelir merah muda dengan kelopak bertekstur lembut dan tampilan manis.", price: 245000, rating: 4.6, reviews: 69, category: "Roses", image: "https://images.unsplash.com/photo-1782038522566-d9cd0eac137a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "p15", name: "White Orchid Grace", latin: "Phalaenopsis amabilis", description: "Anggrek putih elegan dengan tampilan eksklusif untuk hadiah maupun dekorasi.", price: 395000, rating: 4.9, reviews: 105, category: "Houseplants", image: "https://images.unsplash.com/photo-1583846712268-a77d97b7fd68?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", bestSeller: true },
  { id: "p16", name: "Fresh Daisy Meadow", latin: "Bellis perennis", description: "Buket daisy putih sederhana dengan sentuhan hijau yang segar.", price: 225000, rating: 4.6, reviews: 54, category: "Tulips", image: "https://images.unsplash.com/photo-1717614598079-baeb44e09063?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

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
  
];

export const rupiah = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
