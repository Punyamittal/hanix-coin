"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AuroraBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -left-1/4 top-[-20%] h-[60vh] w-[60vw] rounded-full bg-gold/20 blur-[100px] md:blur-[120px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 80, -40, 0],
                y: [0, 60, 20, 0],
                scale: [1, 1.15, 0.95, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-[10%] h-[50vh] w-[50vw] rounded-full bg-amber-600/15 blur-[90px] md:blur-[110px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -60, 40, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.9, 1.2, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-1/3 h-[45vh] w-[45vw] rounded-full bg-gold/10 blur-[80px] md:blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 50, -30, 0],
                y: [0, -40, 20, 0],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_70%)]" />
    </div>
  );
}
