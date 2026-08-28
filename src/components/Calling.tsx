"use client";

import { calling, organisations } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

export default function Calling() {
  return (
    <section id="calling" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mx-auto mb-16 max-w-[50ch] text-center">
          <Reveal>
            <p className="eyebrow mb-6">{calling.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section">{calling.heading}</h2>
          </Reveal>
        </div>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {calling.cards.map((c) => (
            <StaggerItem key={c.no}>
              <article className="group h-full rounded-lg border border-line bg-raise/40 p-8 transition-colors duration-500 hover:border-fire/45">
                <span className="font-display text-3xl text-fire/70 transition-colors duration-500 group-hover:text-fire">
                  {c.no}
                </span>
                <h3 className="h-card mt-5 mb-3.5">{c.title}</h3>
                <p className="body-copy text-[0.94rem]">{c.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* the three houses these expressions are lived out in */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {organisations.map((o) => (
            <div key={o.name} className="bg-ink p-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-fire-soft">{o.role}</p>
              <h4 className="font-display mt-3 mb-2.5 text-lg">{o.name}</h4>
              <p className="text-[0.88rem] leading-relaxed text-dim">{o.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
