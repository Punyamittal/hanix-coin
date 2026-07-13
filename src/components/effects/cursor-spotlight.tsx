"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const springX = useSpring(x, { stiffness: 140, damping: 28 });
  const springY = useSpring(y, { stiffness: 140, damping: 28 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${springX}px ${springY}px, rgba(212,175,55,0.1), transparent 55%)`;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    if (mq.matches) {
      window.addEventListener("mousemove", onMove);
    }

    const onChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches);
      if (e.matches) window.addEventListener("mousemove", onMove);
      else window.removeEventListener("mousemove", onMove);
    };
    mq.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("mousemove", onMove);
      mq.removeEventListener("change", onChange);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ background }}
    />
  );
}
