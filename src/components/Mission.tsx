"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { impact, ministries, mission } from "@/lib/content";
import { Reveal, RevealWords, Stagger, StaggerItem } from "./ui/Reveal";

const ACCENT = {
  gold: { text: "text-gold", ring: "hover:border-gold/45", glow: "rgba(224,167,94,0.14)" },
  ember: { text: "text-ember", ring: "hover:border-ember/45", glow: "rgba(216,118,60,0.14)" },
  steel: { text: "text-steel", ring: "hover:border-steel/45", glow: "rgba(127,147,174,0.14)" },
} as const;

function Pillar({
  no,
  title,
  body,
  index,
}: {
  no: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <StaggerItem className="group relative border-t border-line py-9">
      <div className="grid gap-4 md:grid-cols-12 md:items-baseline md:gap-8">
        <span className="font-display text-2xl leading-none text-gold/70 transition-colors duration-500 group-hover:text-gold md:col-span-1">
          {no}
        </span>
        <h3 className="display-md md:col-span-5 lg:col-span-4">{title}</h3>
        <p className="leading-[1.75] text-bone-dim md:col-span-6 lg:col-span-7">{body}</p>
      </div>
      {/* hairline that draws across on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-ember to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        style={{ transitionDelay: `${index * 30}ms` }}
      />
    </StaggerItem>
  );
}

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="mission" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* ── pillars ─────────────────────────────── */}
        <div className="mb-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">{mission.eyebrow}</p>
            </Reveal>
            <h2 className="display-lg max-w-[12ch]">
              <RevealWords text={mission.heading} />
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={0.12}>
              <p className="lede max-w-[52ch]">
                Timothy communicates biblical truth in a relevant, practical, and
                thought-provoking way &mdash; addressing identity, purpose, holiness, emotional
                healing, mental health, relationships, and spiritual growth.
              </p>
            </Reveal>
          </div>
        </div>

        <Stagger className="mb-32 border-b border-line">
          {mission.pillars.map((p, i) => (
            <Pillar key={p.no} {...p} index={i} />
          ))}
        </Stagger>

        {/* ── organisations ───────────────────────── */}
        <Reveal>
          <p className="eyebrow mb-6">Where he serves</p>
        </Reveal>
        <h2 className="display-lg mb-14 max-w-[16ch]">
          <RevealWords text="Three houses. One heart." />
        </h2>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {ministries.map((m) => {
            const a = ACCENT[m.accent];
            return (
              <StaggerItem key={m.name}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface/40 p-8 transition-colors duration-500 ${a.ring}`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: a.glow }}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <p className={`text-[0.68rem] uppercase tracking-[0.24em] ${a.text}`}>
                      {m.role}
                    </p>
                    <h3 className="display-md mt-4 mb-4">{m.name}</h3>
                    <p className="text-[0.95rem] leading-[1.72] text-bone-dim">{m.blurb}</p>

                    <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                      {m.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-3 py-1 text-[0.7rem] text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      {/* ── humanitarian band ─────────────────────── */}
      <div ref={ref} className="relative mt-32 overflow-hidden border-y border-line/70 bg-ink-2 py-24">
        <motion.div
          aria-hidden
          style={{ x: driftX }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.045]"
        >
          <span className="font-display whitespace-nowrap text-[22vw] leading-none">
            Word &amp; Deed
          </span>
        </motion.div>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-6">{impact.eyebrow}</p>
              </Reveal>
              <h2 className="display-lg max-w-[11ch]">
                <RevealWords text={impact.heading} />
              </h2>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <p className="lede mb-10">{impact.body}</p>
              </Reveal>

              <Stagger className="grid grid-cols-2 gap-x-6 gap-y-4">
                {impact.areas.map((area) => (
                  <StaggerItem key={area}>
                    <div className="flex items-center gap-3 border-b border-line/70 pb-3">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span className="text-sm text-bone-dim">{area}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
