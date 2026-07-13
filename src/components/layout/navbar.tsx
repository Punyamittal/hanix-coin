"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          href="#home"
          className="relative z-50"
          onClick={() => setOpen(false)}
        >
          <Logo showWordmark size="sm" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="border-2 border-transparent px-3.5 py-2 text-sm font-medium text-muted transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold hover:shadow-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <a href={LINKS.app}>Launch App</a>
          </Button>
        </div>

        <button
          type="button"
          className="glass-pill brutal-press relative z-50 inline-flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050505]/70 backdrop-blur-3xl lg:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-head text-2xl uppercase tracking-wide text-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <Button asChild>
                  <a href={LINKS.app} onClick={() => setOpen(false)}>
                    Launch App
                  </a>
                </Button>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
