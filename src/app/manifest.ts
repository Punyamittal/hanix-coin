import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hanix (HNX)",
    short_name: "Hanix",
    description:
      "Hanix is a modern ERC-20 token on Base Sepolia — smart contracts, wallet integration, and a premium Web3 dashboard.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/coin.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
