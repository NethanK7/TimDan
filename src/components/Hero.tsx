"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-[var(--nav-h)] sm:pb-28"
    >
      {/* full-screen cinematic photograph */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0">
        <Image
          src="/images/timothy.jpg"
          alt="Pastor Timothy Daniel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_16%]"
        />
      </motion.div>

      {/* dark cinematic gradient so the words stay clear */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(120% 100% at 20% 100%, rgba(226,87,43,0.16) 0%, transparent 60%)",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[1180px] px-6 sm:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-bone/85"
        >
          {hero.kicker.split(" · ").map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-fire" />}
              {word}
            </span>
          ))}
        </motion.p>

        <h1 className="h-hero mb-8 max-w-[16ch] text-bone">
          <Line text={hero.lines[0]} delay={0.22} />
          <Line text={hero.lines[1]} delay={0.32} />
          <span className="text-fire-soft">
            <Line text={hero.lines[2]} delay={0.42} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.56, ease: EASE }}
          className="lede mb-10 max-w-[46ch]"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.68, ease: EASE }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-fire px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-fire-soft"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-wide text-bone/90 transition-colors duration-300 hover:border-gold/60 hover:text-gold-soft"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
