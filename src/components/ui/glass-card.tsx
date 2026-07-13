"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type SurfaceCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  glow?: boolean;
  tilt?: boolean;
  /** clay = soft embossed (default), glass = frosted */
  morph?: "clay" | "glass";
  variant?: "default" | "gold" | "soft";
};

export function GlassCard({
  className,
  children,
  glow = false,
  tilt = false,
  morph = "clay",
  variant = "default",
  ...props
}: SurfaceCardProps) {
  const surface =
    morph === "glass"
      ? "glass"
      : variant === "gold"
        ? "clay-gold"
        : variant === "soft"
          ? "clay-soft"
          : "clay";

  return (
    <motion.div
      whileHover={tilt ? { y: -4, scale: 1.01 } : { y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative overflow-hidden p-6",
        surface,
        glow && "ring-1 ring-gold/20",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
