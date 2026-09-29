import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import CartDrawer from "@/components/CartDrawer";
import CartProvider from "@/components/CartProvider";
import ThemeProvider, { themeInitScript } from "@/components/ThemeProvider";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bloom Atelier — Toko Bunga & Tanaman Hias",
  description: "Bunga segar, buket custom, dan tanaman hias dengan pengiriman di hari yang sama.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body>
        <ThemeProvider><CartProvider>{children}<CartDrawer /></CartProvider></ThemeProvider>
      </body>
    </html>
  );
}
