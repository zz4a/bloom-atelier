import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

/** Testimonial dalam layout masonry (CSS columns). */
export default function Community() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="font-display text-4xl font-medium">Cerita dari pelanggan</h2>
      </Reveal>
      <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {testimonials.map((t, i) => (
          <Reveal key={`t${i}`} delay={(i % 4) * 0.05} className="break-inside-avoid">
            <figure className="rounded-3xl bg-secondary-container p-5 text-on-secondary-container">
              <Quote size={20} className="opacity-60" />
              <blockquote className="mt-2 text-sm leading-relaxed">{t.text}</blockquote>
              <figcaption className="mt-3 text-sm font-medium">{t.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}