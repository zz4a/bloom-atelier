"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export interface CartItem { id: string; name: string; price: number; qty: number }
interface CartCtx {
  items: CartItem[]; count: number; total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean; setOpen: (v: boolean) => void;
}
const Ctx = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(Ctx);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => prev.some((i) => i.id === item.id)
      ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      : [...prev, { ...item, qty: 1 }]);
    setToast(item.name);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const setQty = useCallback((id: string, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)))), []);
  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items]);

  return (
    <Ctx.Provider value={{ items, count, total, add, setQty, clear, open, setOpen }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div key={toast + count} initial={{ y: 30, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 24 }}
              className="flex items-center gap-2 rounded-2xl bg-on-surface px-4 py-3 text-sm text-surface shadow-xl">
              <Check size={16} /> {toast} ditambahkan ke keranjang
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
