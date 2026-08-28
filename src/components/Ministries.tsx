"use client";

import { impact, ministries, mission } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

export default function Ministries() {
  return (
    <section id="ministries" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        {/* ── what the work is for ─────────────────── */}
        <div className="mx-auto mb-20 max-w-[52ch] text-center">
          <Reveal>
            <p className="eyebrow mb-6">{mission.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section">{mission.heading}</h2>
          </Reveal>
        </div>

        <Stagger className="mb-28 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {mission.pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="border-t border-line pt-7">
                <h3 className="h-card mb-3.5">{p.title}</h3>
                <p className="body-copy text-[0.97rem]">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── the three houses ─────────────────────── */}
        <div className="mx-auto mb-14 max-w-[52ch] text-center">
          <Reveal>
            <p className="eyebrow mb-6">Where he serves</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section">Three houses, one heart.</h2>
          </Reveal>
        </div>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {ministries.map((m) => (
            <StaggerItem key={m.name}>
              <article className="flex h-full flex-col rounded-lg border border-line bg-raise/40 p-8 transition-colors duration-500 hover:border-gold/35">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{m.role}</p>
                <h3 className="h-card mt-4 mb-3.5">{m.name}</h3>
                <p className="body-copy text-[0.94rem]">{m.blurb}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                  {m.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-raise-2 px-3 py-1 text-[0.7rem] text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── humanitarian work ────────────────────── */}
        <div className="mt-28 rounded-lg border border-line bg-raise/30 p-9 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-6">{impact.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h-section">{impact.heading}</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p className="body-copy mb-9">{impact.body}</p>
              </Reveal>
              <Stagger className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {impact.areas.map((area) => (
                  <StaggerItem key={area}>
                    <div className="flex items-center gap-3 border-b border-line-soft pb-3">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span className="text-sm text-dim">{area}</span>
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
