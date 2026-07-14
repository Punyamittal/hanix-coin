import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hanix (HNX)",
    short_name: "Hanix",
    description:
      "Hanix (HNX) is an ERC-20 cryptocurrency built on the Base blockchain as a Web3 learning and development project.",
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
