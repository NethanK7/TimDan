"use client";

import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { hero, roles } from "@/lib/content";
import Magnetic from "./ui/Magnetic";

// WebGL has no server render — load it after hydration so first paint stays instant
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({ text, delay, gold }: { text: string; delay: number; gold?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${gold ? "gold-text" : ""}`}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.25, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  // The preloader runs ~1.4s; hero content lands just after it lifts
  const base = 1.35;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ── ambient layers ─────────────────────────────── */}
      <motion.div style={{ scale: sceneScale, opacity: fade }} className="absolute inset-0 z-0">
        <Scene />
      </motion.div>

      {/* keeps the dust behind the type rather than competing with it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink via-ink/70 to-ink/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-ink to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] z-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(224,167,94,0.13) 0%, rgba(216,118,60,0.06) 32%, transparent 68%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          maskImage: "radial-gradient(72% 62% at 50% 42%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(72% 62% at 50% 42%, #000 20%, transparent 100%)",
        }}
      />

      {/* ── portrait ───────────────────────────────────── */}
      <motion.div
        style={{ y: portraitY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: base - 0.35, ease: EASE }}
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full sm:w-[68%] lg:w-[52%] xl:w-[46%]"
      >
        <div className="portrait-mask relative h-full w-full">
          <Image
            src="/images/timothy.jpg"
            alt="Pastor Timothy Daniel"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 68vw, 52vw"
            className="object-cover object-[58%_22%] opacity-[0.82] contrast-[1.06] saturate-[0.85]"
          />
        </div>
        {/* blend the photo into the page on every edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/10 sm:via-ink/35 sm:to-transparent lg:from-ink lg:via-ink/20" />
        <div className="absolute inset-0 bg-ink/45 sm:bg-ink/20 lg:bg-transparent" />
      </motion.div>

      {/* ── headline ───────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 mx-auto w-full max-w-[1400px] px-5 pb-10 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: base, ease: EASE }}
          className="eyebrow mb-7 max-w-md leading-relaxed"
        >
          {hero.kicker}
        </motion.p>

        <h1 className="display-xl mb-8 max-w-[16ch]">
          <Line text={hero.lines[0]} delay={base + 0.06} />
          <Line text={hero.lines[1]} delay={base + 0.16} />
          <Line text={hero.lines[2]} delay={base + 0.26} gold />
        </h1>

        <div className="max-w-[46ch]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: base + 0.5, ease: EASE }}
            className="lede"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: base + 0.62, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#watch"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold"
              >
                Watch the message
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                  <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden>
                    <path d="M0 0 L9 5 L0 10 Z" fill="currentColor" />
                  </svg>
                </span>
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-bone-dim transition-colors duration-300 hover:border-gold/50 hover:text-bone"
              >
                Explore the work
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* ── footer strip ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: base + 0.85 }}
        className="relative z-20 border-t border-line/60"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-4 px-5 py-5 sm:flex sm:items-center sm:gap-x-10 sm:px-8">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex shrink-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2.5">
              <span className="font-display text-xl leading-none text-bone sm:text-2xl">{s.value}</span>
              <span className="text-[0.55rem] uppercase leading-tight tracking-[0.12em] text-muted sm:text-[0.7rem] sm:tracking-[0.18em]">
                {s.label}
              </span>
            </div>
          ))}

          <div className="ml-auto hidden items-center text-[0.7rem] uppercase tracking-[0.22em] text-muted lg:flex">
            {roles.slice(0, 4).map((r, i) => (
              <span key={r} className="flex items-center">
                {i > 0 && <span className="mx-3 text-line">/</span>}
                {r}
              </span>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="ml-auto hidden shrink-0 items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted sm:flex lg:ml-8"
          >
            Scroll
            <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden>
              <path d="M5 0 V12 M1 8 L5 12.5 L9 8" stroke="currentColor" fill="none" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
