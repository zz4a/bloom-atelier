"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import RippleButton from "./RippleButton";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Home", href: "#home" },
  { label: "Catalog", href: "#catalog" },
  { label: "Bouquet Builder", href: "#builder" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function SearchBar({ className = "" }: { className?: string }) {
  return (
    <label className={`flex items-center gap-2 rounded-full bg-surface-container px-4 py-2 text-on-surface-variant focus-within:ring-2 focus-within:ring-primary ${className}`}>
      <Search size={18} />
      <input type="search" placeholder="Cari bunga…" className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant" />
    </label>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { count, setOpen: setCartOpen } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Container utama dibuat fixed di atas dengan padding agar mengambang */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6"
      >
        {/* Navbar dijadikan kapsul melayang dengan border, rounded-3xl, shadow, dan backdrop-blur */}
        <nav className="mx-auto flex max-w-7xl items-center gap-4 rounded-3xl border border-outline/15 bg-surface/15 p-3 px-4 shadow-lg backdrop-blur-xl transition-all sm:px-6">
          <a href="#home" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
            <Flower2 /> Bloom Atelier
          </a>

          <ul className="ml-6 hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 text-sm text-on-surface-variant transition-colors hover:bg-primary-container hover:text-on-primary-container">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <SearchBar className="hidden w-56 md:flex" />
            <RippleButton onClick={toggle} aria-label="Ganti mode gelap/terang" className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.span>
              </AnimatePresence>
            </RippleButton>
            <RippleButton onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full bg-surface-container lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </RippleButton>
          </div>
        </nav>

        {/* Dropdown Menu Mobile yang menyesuaikan bentuk floating */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-outline/15 bg-surface/90 shadow-xl backdrop-blur-xl lg:hidden"
            >
              <div className="space-y-2 p-4">
                <SearchBar className="md:hidden" />
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-on-surface hover:bg-primary-container">
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating cart - Dipindahkan ke pojok kiri bawah dengan space yang cukup (diperbaiki) */}
      <RippleButton 
        aria-label={`Keranjang, ${count} barang`} 
        onClick={() => setCartOpen(true)} 
        // Perbaikan di sini: 'bottom:' diganti menjadi 'bottom-8' dan 'left-6' diubah menjadi 'left-8' agar tidak mentok
        className="fixed bottom-8 left-8 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-on-primary shadow-xl"
      >
        <ShoppingBag />
        <AnimatePresence>
          {count > 0 && (
            <motion.span 
              key={count} 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0 }} 
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-[11px] font-semibold text-on-secondary"
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </RippleButton>
    </>
  );
}