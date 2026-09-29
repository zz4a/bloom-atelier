import { Quote } from "lucide-react";
import Image from "next/image";
import { instagram, testimonials } from "@/lib/data";
import Reveal from "./Reveal";

/** Testimonial + feed Instagram dalam satu layout masonry (CSS columns). */
export default function Community() {
  const tiles = [
    ...instagram.map((x, i) => ({ type: "img" as const, ...x, key: `i${i}` })),
    ...testimonials.map((t, i) => ({ type: "quote" as const, ...t, key: `t${i}` })),
  ].sort((a, b) => a.key.localeCompare(b.key)); // urutan berselang: i0,i1..,t0..

  const mixed = [];
  for (let k = 0; k < Math.max(instagram.length, testimonials.length); k++) {
    if (instagram[k]) mixed.push(tiles.find((t) => t.key === `i${k}`)!);
    if (testimonials[k]) mixed.push(tiles.find((t) => t.key === `t${k}`)!);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="font-display text-4xl font-medium">Cerita dari pelanggan</h2>
        <p className="mt-2 text-on-surface-variant">Ikuti kami di @bloomatelier.id</p>
      </Reveal>
      <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {mixed.map((t, i) =>
          t.type === "img" ? (
            <Reveal key={t.key} delay={(i % 4) * 0.05} className="break-inside-avoid">
              <div className={`relative ${t.h} overflow-hidden rounded-3xl bg-primary-container`}>
                <Image src={t.src} alt="Foto dari Instagram Bloom Atelier" fill sizes="25vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </Reveal>
          ) : (
            <Reveal key={t.key} delay={(i % 4) * 0.05} className="break-inside-avoid">
              <figure className="rounded-3xl bg-secondary-container p-5 text-on-secondary-container">
                <Quote size={20} className="opacity-60" />
                <blockquote className="mt-2 text-sm leading-relaxed">{t.text}</blockquote>
                <figcaption className="mt-3 text-sm font-medium">{t.name}</figcaption>
              </figure>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}
