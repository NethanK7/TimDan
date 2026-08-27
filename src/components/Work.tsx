"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import TruthPanel from "./TruthPanel";
import BooksPanel from "./BooksPanel";

const EASE = [0.16, 1, 0.3, 1] as const;

const TABS = [
  { id: "truth", label: "Tim Drops Truth", meta: "Digital platform" },
  { id: "books", label: "Books", meta: "Published work" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Work() {
  const [tab, setTab] = useState<TabId>("truth");

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6">The Work</p>
        </Reveal>

        {/* ── tab bar ─────────────────────────────── */}
        <Reveal delay={0.06}>
          <div
            role="tablist"
            aria-label="Timothy's work"
            className="mb-14 flex w-full flex-col gap-2 border-b border-line sm:flex-row sm:items-end sm:gap-0"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className="group relative px-1 pb-5 pr-10 text-left sm:pr-14"
                >
                  <span
                    className={`block text-[0.62rem] uppercase tracking-[0.24em] transition-colors duration-500 ${
                      active ? "text-gold" : "text-muted group-hover:text-bone-dim"
                    }`}
                  >
                    {t.meta}
                  </span>
                  <span
                    className={`mt-2 block font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-tight transition-colors duration-500 ${
                      active ? "text-bone" : "text-muted group-hover:text-bone-dim"
                    }`}
                  >
                    {t.label}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute -bottom-px left-0 right-10 h-[2px] bg-gold sm:right-14"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── panels ──────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {tab === "truth" ? <TruthPanel /> : <BooksPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
