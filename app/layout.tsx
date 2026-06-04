import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "knowourgenes.com · the A-to-Z encyclopedia of your genes",
    template: "%s · knowourgenes.com",
  },
  description:
    "A clear, jargon-free encyclopedia page for every gene that shapes how you eat, move, sleep, and feel. What it does, which variants matter, what carrying one means, and why it is relevant for Indian bodies.",
  keywords: [
    "gene encyclopedia",
    "what does MTHFR do",
    "ACTN3 gene",
    "CYP1A2 meaning",
    "caffeine gene",
    "FTO hunger gene",
    "LCT lactose gene",
    "genetics in plain language India",
  ],
  metadataBase: new URL("https://knowourgenes.com"),
  openGraph: {
    title: "knowourgenes.com · the A-to-Z encyclopedia of your genes",
    description:
      "Look up any gene. Understand it in one read. Plain language, India-aware, free for everyone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
