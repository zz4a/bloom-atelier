"use client";
import { Facebook, Flower2, Instagram, MapPin, Twitter } from "lucide-react";
import { FormEvent, useState } from "react";
import RippleButton from "./RippleButton";

export default function Footer() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };

  return (
    <footer id="contact" className="mt-12 bg-surface-container">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold text-primary"><Flower2 /> Bloom Atelier</a>
          <p className="mt-3 flex items-start gap-2 text-sm text-on-surface-variant"><MapPin size={16} className="mt-0.5 shrink-0" /> Jl. Melati No. 12, Jakarta Selatan</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <RippleButton key={i} aria-label="Sosial media" className="grid h-10 w-10 place-items-center rounded-full bg-surface-high"><Icon size={18} /></RippleButton>
            ))}
          </div>
        </div>
        <nav className="text-sm text-on-surface-variant">
          <p className="mb-3 font-medium text-on-surface">Jelajahi</p>
          <ul className="space-y-2">
            {["Catalog", "Bouquet Builder", "About", "Contact"].map((l) => <li key={l}><a href={`#${l === "Catalog" ? "catalog" : l === "Bouquet Builder" ? "builder" : l.toLowerCase()}`} className="hover:text-primary">{l}</a></li>)}
          </ul>
        </nav>
        <form onSubmit={submit}>
          <p className="mb-3 text-sm font-medium">Kabar terbaru & promo</p>
          {done ? (
            <p className="text-sm text-primary">Terima kasih, Anda sudah terdaftar.</p>
          ) : (
            <div className="flex gap-2">
              <input required type="email" placeholder="Email Anda" aria-label="Email" className="min-w-0 flex-1 rounded-full bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary" />
              <RippleButton type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-on-primary">Berlangganan</RippleButton>
            </div>
          )}
        </form>
      </div>
      <p className="border-t border-outline/20 py-5 text-center text-xs text-on-surface-variant">© {new Date().getFullYear()} Bloom Atelier. Semua hak dilindungi.</p>
    </footer>
  );
}
