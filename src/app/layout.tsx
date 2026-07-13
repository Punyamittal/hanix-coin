import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-head",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hanix.app"),
  title: {
    default: "Hanix (HNX) — ERC-20 Token on Base",
    template: "%s | Hanix",
  },
  description:
    "Hanix is a modern ERC-20 token on Base — a full-stack Web3 project showcasing smart contracts, blockchain deployment, and premium decentralized application design.",
  keywords: [
    "Hanix",
    "HNX",
    "ERC-20",
    "Base",
    "cryptocurrency",
    "Web3",
    "smart contract",
    "blockchain",
  ],
  authors: [{ name: "Hanix" }],
  openGraph: {
    title: "Hanix (HNX) — ERC-20 Token on Base",
    description:
      "A modern ERC-20 token built on Base. Lightweight, transparent, and engineered as a production-ready Web3 showcase.",
    url: "https://hanix.app",
    siteName: "Hanix",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanix (HNX) — ERC-20 Token on Base",
    description:
      "A modern ERC-20 token built on Base. Lightweight, transparent, and engineered as a production-ready Web3 showcase.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "base:app_id": "6a551c01e3b311a8d678e08a",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <Providers>
          <CursorSpotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
