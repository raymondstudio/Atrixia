import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Atrixia | Autonomous AI Shopping Decision Agent",
  description:
    "Shop Smarter. Decide Faster. One intelligent recommendation backed by transparent reasoning instead of hours spent comparing fragmented listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-white">
        {children}
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  );
}
