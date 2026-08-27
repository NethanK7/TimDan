"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import Magnetic from "./ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lenis drives scroll itself; Motion's useScroll() can miss the resulting
    // native scroll events, so this listens directly instead.
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "glass border-b border-line/70" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[var(--nav-h)] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="Home">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-display text-lg tracking-tight">
              Timothy <span className="text-bone-dim">Daniel</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="group relative block px-4 py-2 text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {n.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <a
                href="#connect"
                className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Invite to speak
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-bone"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-px w-4 bg-bone"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
          >
            <ul className="space-y-2">
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: EASE }}
                >
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="display-lg block py-2 text-bone"
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 text-sm text-muted">{site.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
