"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { rupiah } from "@/lib/data";
import { useCart } from "./CartProvider";
import PaymentPanel from "./PaymentPanel";
import RippleButton from "./RippleButton";

type Step = "cart" | "pay" | "done";

export default function CartDrawer() {
  const { items, total, setQty, clear, open, setOpen } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [orderId, setOrderId] = useState("");

  const close = () => { setOpen(false); if (step === "done") setStep("cart"); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-[70] bg-black/50" />
          <motion.aside role="dialog" aria-modal="true" aria-label="Keranjang"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline/20 p-4">
              <h2 className="font-display text-2xl font-medium">{step === "pay" ? "Pembayaran" : "Keranjang"}</h2>
              <RippleButton onClick={close} aria-label="Tutup" className="grid h-10 w-10 place-items-center rounded-full bg-surface-container"><X size={20} /></RippleButton>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {step === "cart" && (items.length === 0 ? (
                <div className="grid h-full place-items-center text-center text-on-surface-variant">
                  <div><ShoppingBag className="mx-auto mb-3" size={40} /><p>Keranjang masih kosong.</p><p className="text-sm">Tambahkan bunga dari katalog.</p></div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-3 rounded-2xl bg-surface-container p-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{i.name}</p>
                        <p className="text-sm text-primary">{rupiah(i.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <RippleButton onClick={() => setQty(i.id, i.qty - 1)} aria-label="Kurangi" className="grid h-8 w-8 place-items-center rounded-full bg-surface-high"><Minus size={14} /></RippleButton>
                        <span className="w-5 text-center text-sm">{i.qty}</span>
                        <RippleButton onClick={() => setQty(i.id, i.qty + 1)} aria-label="Tambah" className="grid h-8 w-8 place-items-center rounded-full bg-surface-high"><Plus size={14} /></RippleButton>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}

              {step === "pay" && <PaymentPanel total={total} onBack={() => setStep("cart")} onPaid={(id) => { setOrderId(id); clear(); setStep("done"); }} />}

              {step === "done" && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grid h-full place-items-center text-center">
                  <div>
                    <CheckCircle2 size={64} className="mx-auto text-primary" />
                    <h3 className="mt-4 font-display text-2xl font-medium">Pembayaran berhasil</h3>
                    <p className="mt-2 text-on-surface-variant">Pesanan {orderId} sedang dirangkai dan akan dikirim hari ini.</p>
                    <RippleButton onClick={close} className="mt-6 rounded-full bg-primary px-6 py-3 font-medium text-on-primary">Lanjut belanja</RippleButton>
                  </div>
                </motion.div>
              )}
            </div>

            {step === "cart" && items.length > 0 && (
              <div className="space-y-3 border-t border-outline/20 p-4">
                <div className="flex justify-between text-lg"><span>Total</span><span className="font-medium text-primary">{rupiah(total)}</span></div>
                <RippleButton onClick={() => setStep("pay")} className="shimmer w-full rounded-full bg-primary py-3.5 font-medium text-on-primary">Lanjut ke pembayaran</RippleButton>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
