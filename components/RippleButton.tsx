"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";

type Ripple = { id: number; x: number; y: number; size: number };
type Props = Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode };

/** Tombol dengan ripple ala Material + efek scale saat hover/tap. */
export default function RippleButton({ children, className = "", onClick, ...rest }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const id = Date.now() + Math.random();
    setRipples((p) => [...p, { id, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
    setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 600);
    onClick?.(e);
  };

  const position = /\b(fixed|absolute|sticky)\b/.test(className) ? "" : "relative";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${position} overflow-hidden ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
      {ripples.map((r) => (
        <span key={r.id} className="ripple" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
      ))}
    </motion.button>
  );
}
