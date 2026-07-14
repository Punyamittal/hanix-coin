import { ArrowRight, FileSearch, Wallet } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/effects/grid-pattern";
import { HeroContractBadge } from "@/components/web3/hero-contract-badge";
import { LINKS, SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <GridPattern />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-[-20%] h-[50vh] w-[50vw] rounded-full bg-gold/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-[15%] h-[40vh] w-[40vw] rounded-full bg-amber-700/10 blur-[90px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-20 pt-12 text-center sm:px-6">
        <div className="glass-panel w-full rounded-[calc(var(--radius)+8px)] px-6 py-10 sm:px-10 sm:py-14 md:px-14">
          <div className="relative mb-8 inline-flex">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 scale-150 rounded-full bg-gold/25 blur-3xl"
            />
            <div className="clay relative p-4 md:p-5">
              <Logo size="xl" />
            </div>
          </div>

          <h1 className="font-head text-5xl uppercase tracking-[0.12em] text-foreground sm:text-6xl md:text-7xl">
            {SITE.name.toUpperCase()}
          </h1>

          <p className="mt-4 text-lg text-gold sm:text-xl">{SITE.tagline}</p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            An ERC-20 token on Base built as a Web3 learning and development
            project.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="#dashboard">
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
            <Button asChild variant="outline" size="lg">
              <a href="#dashboard">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </a>
            </Button>
          </div>

          <div className="mt-10 w-full">
            <HeroContractBadge />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
