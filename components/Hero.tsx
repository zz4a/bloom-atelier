"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { heroImages, img } from "@/lib/data";
import RippleButton from "./RippleButton";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } } };

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % heroImages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-20">
      <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
        <motion.p variants={item} className="mb-4 inline-block rounded-full bg-secondary-container px-4 py-1.5 text-sm text-on-secondary-container">
          Koleksi musim ini sudah tersedia
        </motion.p>
        <motion.h1 variants={item} className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
          Crafting Timeless Botanical Moments
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-md text-lg leading-relaxed text-on-surface-variant">
          Bunga segar dari petani lokal, dirangkai tangan dan diantar di hari yang sama ke pintu Anda.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <RippleButton onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })} className="shimmer rounded-full bg-primary px-7 py-3.5 font-medium text-on-primary shadow-lg">
            Explore Collection
          </RippleButton>
          <RippleButton onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full border border-outline px-7 py-3.5 font-medium text-primary hover:bg-primary-container/50">
            Custom Bouquet
          </RippleButton>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="order-1 grid grid-cols-5 grid-rows-5 gap-3 lg:order-2">
        <div className="relative col-span-3 row-span-5 h-[380px] overflow-hidden rounded-[56px_16px_56px_16px] bg-primary-container sm:h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
              <Image src={heroImages[i]} alt="Buket bunga segar" fill priority sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[16px_64px_16px_16px] bg-secondary-container">
          <Image src={img("photo-1563241527-3004b7be0ffd", 600)} alt="Tulip pastel" fill sizes="20vw" className="object-cover" />
        </div>
        <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[28px] bg-surface-high">
          <Image src={img("photo-1485955900006-10f4d324d411", 600)} alt="Tanaman hias" fill sizes="20vw" className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
