"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { about, roles } from "@/lib/content";
import { Reveal, RevealWords } from "./ui/Reveal";
import Marquee from "./ui/Marquee";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" className="relative py-28 sm:py-36">
      <Marquee items={roles} className="mb-24 border-y border-line/60 py-7" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6">{about.eyebrow}</p>
        </Reveal>

        <h2 className="display-lg mb-16 max-w-[14ch]">
          <RevealWords text={about.heading} />
        </h2>

        <div ref={ref} className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* portrait rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line/60">
                  <motion.div style={{ y: imgY }} className="absolute -inset-y-[9%] inset-x-0">
                    <Image
                      src="/images/timothy.jpg"
                      alt="Pastor Timothy Daniel"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-[52%_20%] grayscale-[0.15] contrast-[1.05]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-2xl">Pastor Timothy Daniel</p>
                    <p className="mt-1 text-sm text-bone-dim">
                      The Father&rsquo;s House Church &middot; Colombo, Sri Lanka
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line/60 bg-line/60">
                  {[
                    { k: "Serving with", v: "Viji, his wife" },
                    { k: "Based in", v: "Colombo, LK" },
                    { k: "Podcast", v: "The Altar Talk" },
                    { k: "Platform", v: "Tim Drops Truth" },
                  ].map((row) => (
                    <div key={row.k} className="bg-ink px-5 py-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
                        {row.k}
                      </p>
                      <p className="mt-1.5 text-sm text-bone">{row.v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* prose */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="space-y-7">
              {about.body.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p
                    className={
                      i === 0
                        ? "text-[1.18rem] leading-[1.72] text-bone sm:text-[1.32rem]"
                        : "leading-[1.78] text-bone-dim"
                    }
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <figure className="mt-14 border-l-2 border-gold pl-7">
                <blockquote className="display-md text-bone/90">{about.pull}</blockquote>
                <figcaption className="mt-5 text-sm text-gold">
                  To reveal the heart of the Father, awaken purpose, restore broken lives, and
                  prepare a generation to carry the presence of God.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
