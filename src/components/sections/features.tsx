"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  Coins,
  Puzzle,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { FEATURES } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Globe,
  Coins,
  Puzzle,
  Rocket,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[100px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Engineered for clarity and performance"
          description="Every design choice prioritizes security, speed, and transparency — the fundamentals of a credible on-chain asset."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <GlassCard tilt className="h-full" morph="clay" variant="soft">
                  <div className="clay-icon mb-4 flex h-12 w-12 items-center justify-center text-gold">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="font-head text-lg uppercase tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
