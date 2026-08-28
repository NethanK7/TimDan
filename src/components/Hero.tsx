"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The portrait is 2:3 — full-bleeding it across a wide viewport crops far
  // too close, so it lives in its own panel and only drifts a little.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--nav-h)+2rem)] pb-16 sm:pb-20"
    >
      {/* a single soft pool of warmth behind the type, nothing more */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[50rem] w-[50rem] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(216,168,92,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="eyebrow mb-7 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            {hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            className="h-hero mb-8"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="lede mb-10 max-w-[44ch]"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.46, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-8 py-4 text-sm text-dim transition-colors duration-300 hover:border-gold/50 hover:text-bone"
            >
              <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden className="text-gold">
                <path d="M0 0 L9 5.5 L0 11 Z" fill="currentColor" />
              </svg>
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-xl border border-line lg:ml-auto lg:mr-0 lg:max-w-none">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-[6%] inset-x-0">
              <Image
                src="/images/timothy.jpg"
                alt="Pastor Timothy Daniel"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover object-[54%_20%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
