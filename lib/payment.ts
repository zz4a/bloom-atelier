/**
 * PAYMENT DUMMY — semua fungsi di sini palsu (tidak ada uang/transaksi nyata).
 * Saat siap produksi, ganti isi createPayment & confirmPayment dengan panggilan
 * ke API route Anda yang memakai Midtrans / Xendit / Duitku, dan pakai webhook
 * dari gateway (bukan tombol simulasi) untuk menandai pesanan lunas.
 */
export type PaymentMethod = "qris" | "bca" | "mandiri" | "bni" | "bri";

export const banks: { id: Exclude<PaymentMethod, "qris">; name: string; prefix: string }[] = [
  { id: "bca", name: "BCA", prefix: "39" },
  { id: "mandiri", name: "Mandiri", prefix: "88" },
  { id: "bni", name: "BNI", prefix: "98" },
  { id: "bri", name: "BRI", prefix: "26" },
];

export interface PaymentSession {
  orderId: string; method: PaymentMethod; amount: number; expiresAt: number;
  vaNumber?: string; qrSeed?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const digits = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

export async function createPayment(method: PaymentMethod, amount: number): Promise<PaymentSession> {
  await sleep(900);
  const orderId = `BLM-${Date.now().toString(36).toUpperCase()}`;
  if (method === "qris") return { orderId, method, amount, expiresAt: Date.now() + 15 * 60_000, qrSeed: orderId };
  const bank = banks.find((b) => b.id === method)!;
  return { orderId, method, amount, expiresAt: Date.now() + 24 * 3600_000, vaNumber: bank.prefix + digits(13) };
}

export async function confirmPayment(_orderId: string): Promise<{ status: "paid" }> {
  await sleep(1500);
  return { status: "paid" };
}
