import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
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
          background: "#050505",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coinSrc}
          width={512}
          height={512}
          alt=""
          style={{ width: 512, height: 512, objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
