"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { family, meet } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export default function Meet() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div ref={ref} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line">
                <motion.div style={{ y: imgY }} className="absolute -inset-y-[6%] inset-x-0">
                  <Image
                    src="/images/story.jpg"
                    alt="Timothy Daniel — preaching, filming, leading, and at home with his family"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              </div>
            </Reveal>

            {/* home life, folded in as a quiet supporting note rather than its own section */}
            <Reveal delay={0.1}>
              <div className="mt-4 flex items-center gap-4 rounded-lg border border-line bg-raise/40 p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                  <Image
                    src="/images/family.jpg"
                    alt={family.caption}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <p className="text-sm leading-relaxed text-dim">{meet.familyNote}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{meet.eyebrow}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h-section mb-8">{meet.heading}</h2>
            </Reveal>

            <div className="space-y-6">
              {meet.body.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className={i === 0 ? "lede" : "body-copy"}>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <a
                href={meet.cta.href}
                className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-fire-soft transition-colors hover:text-fire"
              >
                {meet.cta.label}
                <span aria-hidden>&rarr;</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
