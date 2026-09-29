"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Building2, Copy, Loader2, QrCode } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { banks, confirmPayment, createPayment, PaymentMethod, PaymentSession } from "@/lib/payment";
import { rupiah } from "@/lib/data";
import RippleButton from "./RippleButton";

/** QR TAMPILAN SAJA (dummy) — bukan QR yang bisa di-scan. Diganti QR dari gateway nanti. */
function DummyQR({ seed }: { seed: string }) {
  const N = 25;
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 2 ** 32; };
  const cells: JSX.Element[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let dark: boolean;
    const tl = x < 7 && y < 7, tr = x >= N - 7 && y < 7, bl = x < 7 && y >= N - 7;
    if (tl || tr || bl) {
      const lx = tr ? x - (N - 7) : x, ly = bl ? y - (N - 7) : y;
      dark = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
    } else dark = rnd() > 0.5;
    if (dark) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
  }
  return (
    <svg viewBox={`-2 -2 ${N + 4} ${N + 4}`} className="mx-auto h-52 w-52 rounded-2xl bg-white p-1" fill="#111" shapeRendering="crispEdges" role="img" aria-label="QRIS dummy">
      {cells}
    </svg>
  );
}

function useCountdown(expiresAt?: number) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => setLeft(Math.max(0, expiresAt - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);
  const s = Math.floor(left / 1000);
  const f = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(":");
  return { left, label: f };
}

export default function PaymentPanel({ total, onBack, onPaid }: { total: number; onBack: () => void; onPaid: (orderId: string) => void }) {
  const [method, setMethod] = useState<PaymentMethod>("qris");
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const { left, label } = useCountdown(session?.expiresAt);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setSession(await createPayment(method, total));
    setBusy(false);
  };
  const simulatePaid = async () => {
    if (!session) return;
    setBusy(true);
    await confirmPayment(session.orderId);
    onPaid(session.orderId);
  };
  const copyVA = async () => {
    try { await navigator.clipboard.writeText(session!.vaNumber!); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  const opt = (id: PaymentMethod, title: string, icon: React.ReactNode) => (
    <RippleButton key={id} role="radio" aria-checked={method === id} onClick={() => setMethod(id)}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm ${method === id ? "border-primary bg-primary-container text-on-primary-container" : "border-outline/30"}`}>
      {icon}<span className="font-medium">{title}</span>
    </RippleButton>
  );

  if (session) {
    const expired = left === 0;
    const bank = banks.find((b) => b.id === session.method);
    return (
      <div className="space-y-5 text-center">
        <p className="text-sm text-on-surface-variant">Pesanan {session.orderId}</p>
        <p className="font-display text-3xl font-medium text-primary">{rupiah(session.amount)}</p>
        {session.qrSeed ? (
          <>
            <DummyQR seed={session.qrSeed} />
            <p className="text-xs text-on-surface-variant">QR contoh untuk tampilan, belum bisa di-scan.</p>
          </>
        ) : (
          <div className="rounded-2xl bg-surface-container p-4">
            <p className="text-sm text-on-surface-variant">Nomor Virtual Account {bank?.name}</p>
            <p className="mt-1 font-mono text-2xl tracking-wider">{session.vaNumber}</p>
            <RippleButton onClick={copyVA} className="mx-auto mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-on-primary">
              <Copy size={14} /> {copied ? "Tersalin" : "Salin nomor"}
            </RippleButton>
          </div>
        )}
        <p className={`text-sm ${expired ? "text-secondary" : "text-on-surface-variant"}`}>
          {expired ? "Waktu pembayaran habis. Buat pembayaran baru." : `Bayar dalam ${label}`}
        </p>
        {expired ? (
          <RippleButton onClick={() => setSession(null)} className="w-full rounded-full bg-primary py-3 font-medium text-on-primary">Buat pembayaran baru</RippleButton>
        ) : (
          <RippleButton onClick={simulatePaid} disabled={busy} className="shimmer flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 font-medium text-on-secondary">
            {busy ? <><Loader2 size={18} className="animate-spin" /> Memeriksa pembayaran…</> : "Simulasikan pembayaran berhasil"}
          </RippleButton>
        )}
        <p className="text-xs text-on-surface-variant">Mode demo: tidak ada uang yang diproses.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <RippleButton onClick={onBack} className="flex items-center gap-1 text-sm text-primary"><ArrowLeft size={16} /> Kembali ke keranjang</RippleButton>
      <div className="space-y-2">
        <input required name="name" placeholder="Nama lengkap" className="w-full rounded-2xl bg-surface-container px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
        <input required type="email" name="email" placeholder="Email" className="w-full rounded-2xl bg-surface-container px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div role="radiogroup" aria-label="Metode pembayaran" className="space-y-2">
        <p className="text-sm font-medium">Metode pembayaran</p>
        {opt("qris", "QRIS", <QrCode size={20} />)}
        <p className="pt-1 text-sm font-medium">Transfer bank (Virtual Account)</p>
        <div className="grid grid-cols-2 gap-2">{banks.map((b) => opt(b.id, b.name, <Building2 size={20} />))}</div>
      </div>
      <RippleButton type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-medium text-on-primary">
        {busy ? <><Loader2 size={18} className="animate-spin" /> Membuat pembayaran…</> : `Bayar ${rupiah(total)}`}
      </RippleButton>
    </form>
  );
}
