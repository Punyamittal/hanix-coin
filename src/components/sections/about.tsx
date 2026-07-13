"use client";

import { motion } from "framer-motion";
import {
  Code2,
  FileCode2,
  Blocks,
  Wallet,
  ShieldCheck,
  LayoutTemplate,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { ABOUT_ITEMS } from "@/lib/constants";

const ICONS = [Code2, FileCode2, Blocks, Wallet, ShieldCheck, LayoutTemplate];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-gold/10 blur-[100px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Built to learn. Shipped to demonstrate."
          description="Hanix is a personal blockchain project built to explore and showcase the full stack of modern Web3 engineering — from Solidity contracts to polished decentralized interfaces."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_ITEMS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard tilt glow className="h-full" morph="clay">
                  <div className="clay-icon mb-4 inline-flex h-11 w-11 items-center justify-center text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-head text-lg uppercase tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
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
