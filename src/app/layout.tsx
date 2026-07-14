import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { DeferredSpotlight } from "@/components/effects/deferred-spotlight";
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
  display: "swap",
  preload: false,
});

const title = "Hanix (HNX) — Modern ERC-20 Token on Base";
const description =
  "Hanix (HNX) is an ERC-20 cryptocurrency built on the Base blockchain as a Web3 learning and development project.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanix.website"),
  title: {
    default: title,
    template: "%s | Hanix",
  },
  description,
  keywords: [
    "Hanix",
    "HNX",
    "ERC-20",
    "Base",
    "Base blockchain",
    "cryptocurrency",
    "Web3",
    "smart contract",
    "blockchain",
    "dApp",
    "token",
  ],
  authors: [{ name: "Hanix" }],
  icons: {
    icon: [{ url: "/coin.png", type: "image/png" }],
    apple: [{ url: "/coin.png", type: "image/png" }],
    shortcut: "/coin.png",
  },
  alternates: {
    canonical: "https://hanix.website",
  },
  openGraph: {
    title,
    description,
    url: "https://hanix.website",
    siteName: "Hanix",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      <head>
        <link rel="preload" href="/coin.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://sepolia.base.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sepolia.base.org" />
      </head>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <JsonLd />
        <Analytics />
        <Providers>
          <DeferredSpotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
