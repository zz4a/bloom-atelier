"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { rupiah } from "@/lib/data";
import { useCart } from "./CartProvider";
import Reveal from "./Reveal";
import RippleButton from "./RippleButton";

const flowers = [{ n: "Mawar", p: 30000 }, { n: "Tulip", p: 25000 }, { n: "Peony", p: 45000 }, { n: "Bunga kering", p: 20000 }];
const sizes = [{ n: "Kecil", q: 5 }, { n: "Sedang", q: 9 }, { n: "Besar", q: 15 }];
const wraps = ["Krem", "Sage", "Rose"];

function Chips<T extends string>({ label, options, value, onChange }: { label: string; options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <RippleButton key={o} onClick={() => onChange(o)} aria-pressed={value === o}
            className={`rounded-full px-4 py-2 text-sm ${value === o ? "bg-primary text-on-primary" : "bg-surface text-on-surface"}`}>
            {o}
          </RippleButton>
        ))}
      </div>
    </div>
  );
}

export default function BouquetBuilder() {
  const { add } = useCart();
  const [flower, setFlower] = useState(flowers[0].n);
  const [size, setSize] = useState(sizes[1].n);
  const [wrap, setWrap] = useState(wraps[0]);
  const price = 60000 + flowers.find((f) => f.n === flower)!.p * sizes.find((s) => s.n === size)!.q;

  return (
    <section id="builder" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Reveal>
        <div className="grid gap-8 rounded-[40px] bg-primary-container p-6 text-on-primary-container sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-medium">Rangkai buketmu sendiri</h2>
            <p className="mt-3 max-w-sm opacity-90">Pilih bunga, ukuran, dan warna pembungkus. Harga langsung terlihat.</p>
          </div>
          <div className="space-y-5 rounded-m3-xl bg-surface-container p-5 text-on-surface">
            <Chips label="Bunga utama" options={flowers.map((f) => f.n)} value={flower} onChange={setFlower} />
            <Chips label="Ukuran" options={sizes.map((s) => s.n)} value={size} onChange={setSize} />
            <Chips label="Pembungkus" options={wraps} value={wrap} onChange={setWrap} />
            <div className="flex items-center justify-between gap-3 pt-2">
              <motion.span key={price} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-medium text-primary">{rupiah(price)}</motion.span>
              <RippleButton onClick={() => add({ id: `custom-${flower}-${size}-${wrap}`, name: `Buket ${flower} ${size} (${wrap})`, price })} className="shimmer rounded-full bg-secondary px-6 py-3 font-medium text-on-secondary">
                Tambah ke keranjang
              </RippleButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
