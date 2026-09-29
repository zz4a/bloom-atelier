import { Leaf, Recycle, Truck, Sprout } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  { icon: Truck, title: "Same-day Delivery", text: "Pesan sebelum pukul 14.00, tiba hari ini." },
  { icon: Leaf, title: "Freshly Sourced", text: "Dipanen dari kebun mitra dalam 24 jam." },
  { icon: Recycle, title: "Eco-friendly Packaging", text: "Kertas daur ulang tanpa plastik sekali pakai." },
  { icon: Sprout, title: "Fresh Guarantee", text: "Layu dalam 3 hari? Kami ganti gratis." },
];

export default function FeatureBadges() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="flex h-full items-start gap-4 rounded-m3-xl bg-surface-container p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-container text-on-primary-container"><Icon size={24} /></span>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
