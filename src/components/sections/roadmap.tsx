"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ROADMAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[110px]"
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Roadmap"
          title="From contract to ecosystem"
          description="A clear path from foundational deployment to community-driven features — executed in deliberate phases."
        />

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-gold via-gold/40 to-white/10"
          />

          <ol className="space-y-8">
            {ROADMAP.map((phase, index) => {
              const isComplete = phase.status === "complete";
              const isCurrent = phase.status === "current";

              return (
                <motion.li
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-12"
                >
                  <span
                    className={cn(
                      "absolute left-1.5 top-1 flex h-6 w-6 items-center justify-center",
                      isComplete &&
                        "clay-icon border-gold bg-gold text-background",
                      isCurrent &&
                        "clay-pill border-gold text-gold",
                      phase.status === "upcoming" &&
                        "clay-pill border-gold/30 text-muted"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <Circle className="h-2.5 w-2.5 fill-current" />
                    )}
                  </span>

                  <div className="clay group p-5">
                    <div className="relative z-10 flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          "clay-pill px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
                          isComplete && "text-gold",
                          isCurrent && "text-gold",
                          phase.status === "upcoming" && "text-muted"
                        )}
                      >
                        {phase.phase}
                      </span>
                      <h3 className="font-head text-xl uppercase tracking-tight text-foreground">
                        {phase.title}
                      </h3>
                    </div>

                    <ul className="relative z-10 mt-4 space-y-2.5">
                      {phase.items.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center gap-2.5 text-sm text-muted"
                        >
                          {item.done ? (
                            <Check className="h-4 w-4 shrink-0 text-gold" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 shrink-0 text-white/25" />
                          )}
                          <span className={cn(item.done && "text-foreground")}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
