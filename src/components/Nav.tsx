"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Lenis drives scroll itself, so this listens to the window directly
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "border-b border-line bg-ink/92 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[var(--nav-h)] max-w-[1180px] items-center justify-between px-6 sm:px-10">
          <a href="#top" className="font-display text-lg tracking-tight" aria-label="Home">
            Timothy <span className="text-muted">Daniel</span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm text-dim transition-colors duration-300 hover:text-bone"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#connect"
              className="hidden rounded-full border border-line px-5 py-2.5 text-sm text-bone transition-colors duration-300 hover:border-gold/50 hover:text-gold sm:block"
            >
              Get in touch
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-bone"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-bone"
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
          >
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="h-section block py-2.5"
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
