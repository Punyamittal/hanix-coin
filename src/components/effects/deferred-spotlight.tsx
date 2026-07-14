"use client";

import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(
  () =>
    import("@/components/effects/cursor-spotlight").then(
      (m) => m.CursorSpotlight,
    ),
  { ssr: false },
);

export function DeferredSpotlight() {
  return <CursorSpotlight />;
}
