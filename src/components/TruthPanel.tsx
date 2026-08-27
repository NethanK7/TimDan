"use client";

import { motion } from "motion/react";
import { truth } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

export default function TruthPanel() {
  return (
    <div>
      <div className="mb-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="display-lg mb-6 max-w-[13ch]">
            Short messages. <span className="gold-text">Long shadows.</span>
          </h3>
          <p className="lede max-w-[54ch]">{truth.body}</p>
        </div>

        <div className="flex flex-col justify-end gap-5 lg:col-span-5 lg:items-end">
          <p className="font-display text-2xl text-bone-dim">{truth.handle}</p>
          <div className="flex flex-wrap gap-2.5">
            {truth.socials.map((s) => (
              <Magnetic key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                >
                  {s.label}
                  <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden className="opacity-60">
                    <path d="M1 8 L8 1 M2.6 1 H8 V6.4" stroke="currentColor" fill="none" />
                  </svg>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>

      {/* theme chips */}
      <div className="mb-12 flex flex-wrap gap-2">
        {truth.themes.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-full border border-line bg-surface/50 px-4 py-1.5 text-[0.78rem] text-bone-dim"
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* the drops */}
      <Stagger className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {truth.drops.map((d, i) => (
          <StaggerItem key={d.title}>
            <article
              data-cursor
              className="group relative h-full overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-surface/60"
            >
              <span className="absolute right-6 top-6 font-display text-sm text-line transition-colors duration-500 group-hover:text-gold/60">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-[0.66rem] uppercase tracking-[0.24em] text-gold">{d.topic}</p>
              <h4 className="display-md mt-4 mb-4 max-w-[15ch] leading-[1.08]">{d.title}</h4>
              <p className="text-[0.95rem] leading-[1.75] text-bone-dim">{d.body}</p>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
