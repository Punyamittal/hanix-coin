"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({
  children,
  strength = 20,
  className,
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(sy, [-strength, strength], [4, -4]);
  const rotateY = useTransform(sx, [-strength, strength], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * strength);
    my.set(py * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: sx,
        y: sy,
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
