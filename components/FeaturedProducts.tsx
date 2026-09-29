"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categories, products } from "@/lib/data";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import RippleButton from "./RippleButton";

export default function FeaturedProducts() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="font-display text-4xl font-medium">Pilihan minggu ini</h2>
        <p className="mt-2 max-w-md text-on-surface-variant">Dirangkai pagi ini oleh florist kami.</p>
      </Reveal>

      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="tablist">
        {categories.map((c) => (
          <RippleButton key={c} role="tab" aria-selected={active === c} onClick={() => setActive(c)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${active === c ? "bg-secondary-container text-on-secondary-container" : "border border-outline/40 text-on-surface-variant"}`}>
            {c}
          </RippleButton>
        ))}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
