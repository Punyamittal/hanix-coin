"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileSearch } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { FloatingParticles } from "@/components/effects/floating-particles";
import { GridPattern } from "@/components/effects/grid-pattern";
import { MouseParallax } from "@/components/effects/mouse-parallax";
import { ConnectWallet } from "@/components/web3/connect-wallet";
import { ContractAddress } from "@/components/web3/contract-address";
import { LINKS, SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <AuroraBackground />
      <GridPattern />
      <FloatingParticles />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-20 pt-12 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel w-full rounded-[calc(var(--radius)+8px)] px-6 py-10 sm:px-10 sm:py-14 md:px-14"
        >
          <MouseParallax strength={18} className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 scale-150 rounded-full bg-gold/25 blur-3xl"
              />
              <div className="clay relative p-4 md:p-5">
                <Logo size="xl" />
              </div>
            </motion.div>
          </MouseParallax>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-head text-5xl uppercase tracking-[0.12em] text-foreground sm:text-6xl md:text-7xl"
          >
            {SITE.name.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="mt-4 text-lg text-gold sm:text-xl"
          >
            {SITE.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {SITE.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#tokenomics">
                Explore Token
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a
                href={LINKS.basescan}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileSearch className="h-4 w-4" />
                View Contract
              </a>
            </Button>
            <ConnectWallet variant="outline" size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 w-full"
          >
            <ContractAddress />
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
