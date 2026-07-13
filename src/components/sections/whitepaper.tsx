"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/lib/constants";

export function WhitepaperSection() {
  return (
    <section id="whitepaper" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[100px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Whitepaper"
          title="Technical overview"
          description="A concise document covering the Hanix token design, Base deployment details, and the engineering goals behind the project."
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="clay-gold relative mx-auto max-w-2xl overflow-hidden p-8 text-center md:p-12"
        >
          <div className="relative z-10">
            <div className="clay-icon mx-auto mb-6 flex h-16 w-16 items-center justify-center text-gold">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="font-head text-2xl uppercase tracking-tight text-foreground">
              Hanix Protocol Whitepaper
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Learn how HNX is structured as a fixed-supply ERC-20 on Base, why
              OpenZeppelin standards were chosen, and how the frontend connects
              to on-chain infrastructure.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href={LINKS.whitepaper} download>
                  <Download className="h-4 w-4" />
                  Download Whitepaper
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted/70">
              PDF · Technical overview of Hanix (HNX)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
