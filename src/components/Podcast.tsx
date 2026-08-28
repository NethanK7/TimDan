"use client";

import Image from "next/image";
import { podcast, truth } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export default function Podcast() {
  return (
    <section id="listen" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* studio shot has a light background, so it sits in a contained
              panel rather than bleeding into the page */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-raise">
                <Image
                  src="/images/podcast.jpg"
                  alt="Timothy Daniel standing on an oversized phone playing an episode"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">{podcast.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mb-5">{podcast.name}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display mb-6 text-xl text-gold-soft sm:text-2xl">
                {podcast.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="body-copy mb-10 max-w-[46ch]">{podcast.body}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-2.5">
                {podcast.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-lg border border-line px-6 py-4 transition-colors duration-500 hover:border-gold/45"
                  >
                    <span className="text-sm text-bone">{l.label}</span>
                    <span className="text-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mt-8 text-sm text-muted">
                Short-form drops go out daily on{" "}
                <span className="text-dim">{truth.handle}</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
