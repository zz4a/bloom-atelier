"use client";
import { motion } from "framer-motion";
import { Flower2, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Product, rupiah } from "@/lib/data";
import { useCart } from "./CartProvider";
import RippleButton from "./RippleButton";

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [broken, setBroken] = useState(false);

  return (
    <motion.article layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group overflow-hidden rounded-m3-xl bg-surface-container">
      <div className="relative aspect-[4/5] overflow-hidden bg-primary-container">
        {broken ? (
          <div className="grid h-full place-items-center text-primary"><Flower2 size={48} /></div>
        ) : (
          <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" onError={() => setBroken(true)}
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        {p.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-on-secondary">Best Seller</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs italic text-on-surface-variant">{p.latin}</p>
        <h3 className="mt-0.5 font-display text-lg font-medium">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-on-surface-variant">{p.description}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star size={14} className="fill-secondary text-secondary" />
          <span className="font-medium">{p.rating}</span>
          <span className="text-on-surface-variant">({p.reviews})</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-medium text-primary">{rupiah(p.price)}</span>
          <RippleButton onClick={() => add({ id: p.id, name: p.name, price: p.price })} aria-label={`Tambah ${p.name} ke keranjang`} className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary">
            <Plus size={16} /> Quick Add
          </RippleButton>
        </div>
      </div>
    </motion.article>
  );
}
