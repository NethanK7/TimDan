"use client";

import { impact } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

export default function Impact() {
  return (
    <section id="outreach" className="relative overflow-hidden py-24 sm:py-32">
      {/* bold gradient stands in for outreach photography — swap for a real
          field photo once one is supplied; see README */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 15%, rgba(226,87,43,0.22) 0%, transparent 55%), radial-gradient(120% 90% at 85% 100%, rgba(201,154,78,0.16) 0%, transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mx-auto mb-14 max-w-[62ch] text-center">
          <Reveal>
            <p className="eyebrow mb-6">{impact.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-hero mb-7">{impact.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mb-4">{impact.body}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-sm italic text-muted">{impact.kicker}</p>
          </Reveal>
        </div>

        <Stagger className="mb-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {impact.counters.map((c) => (
            <StaggerItem key={c.label}>
              <div className="text-center">
                <p className="h-section text-fire-soft">{c.value}</p>
                <p className="mt-2 text-[0.72rem] uppercase leading-tight tracking-[0.14em] text-dim">
                  {c.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={impact.primaryCta.href}
              target={impact.primaryCta.external ? "_blank" : undefined}
              rel={impact.primaryCta.external ? "noreferrer noopener" : undefined}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-bone px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-gold-soft"
            >
              {impact.primaryCta.label}
            </a>
            <a
              href={impact.secondaryCta.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-wide text-bone/90 transition-colors duration-300 hover:border-fire/50 hover:text-fire-soft"
            >
              {impact.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
