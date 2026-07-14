import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const SOCIAL_IMAGE_ALT = "Hanix — Built on Base";

export async function createSocialShareImage(): Promise<ImageResponse> {
  const coin = await readFile(join(process.cwd(), "public/coin.png"));
  const coinSrc = `data:image/png;base64,${coin.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: "0 72px",
          background:
            "radial-gradient(circle at 25% 50%, rgba(212,175,55,0.18) 0%, transparent 42%), linear-gradient(135deg, #0a0a0a 0%, #050505 55%, #0d0b06 100%)",
          color: "#F5E6A3",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coinSrc}
          width={360}
          height={360}
          alt=""
          style={{
            width: 360,
            height: 360,
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: "#F5E6A3",
              lineHeight: 1,
            }}
          >
            HANIX
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#D4AF37",
              lineHeight: 1.2,
            }}
          >
            Built on Base
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "rgba(245,230,163,0.72)",
              lineHeight: 1.2,
            }}
          >
            Modern ERC20 Token
          </div>
        </div>
      </div>
    ),
    { ...SOCIAL_IMAGE_SIZE },
  );
}
