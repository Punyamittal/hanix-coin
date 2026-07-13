"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-gold">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-sm bg-gold shadow-[2px_2px_6px_rgba(212,175,55,0.4)]" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-head text-3xl font-normal uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div
        aria-hidden
        className={cn(
          "mt-4 h-1 w-16 rounded-full bg-gold shadow-[0_4px_12px_rgba(212,175,55,0.35)]",
          align === "center" && "mx-auto"
        )}
      />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
