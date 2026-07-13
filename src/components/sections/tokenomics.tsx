"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Hash,
  Network,
  FileCode,
  Layers,
  CircleDot,
  Lock,
  Flame,
  Percent,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { TOKENOMICS } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Hash,
  Network,
  FileCode,
  Layers,
  CircleDot,
  Lock,
  Flame,
  Percent,
  UserX,
};

export function TokenomicsSection() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tokenomics"
          title="Transparent on-chain parameters"
          description="Fixed supply. Zero tax. OpenZeppelin-based ERC-20 on Base — designed for predictability and easy verification."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="clay-gold relative overflow-hidden p-3"
        >
          <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TOKENOMICS.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="clay-cell group p-5"
                >
                  <div className="clay-icon mb-3 inline-flex h-9 w-9 items-center justify-center text-gold">
                    {Icon && <Icon className="h-4 w-4" />}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-head text-base uppercase tracking-tight text-foreground sm:text-lg">
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <GlassCard morph="clay" variant="gold" className="mt-6">
          <p className="text-center text-sm text-muted">
            Total supply is capped at{" "}
            <span className="font-medium text-gold">1,000,000 HNX</span>. No
            mint function. No transfer tax. Contract ownership is intended to be
            renounced after deployment.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
