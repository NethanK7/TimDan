"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { welcome } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export default function Welcome() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div ref={ref} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* the collage says "many callings" better than a paragraph can */}
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
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{welcome.eyebrow}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h-section mb-8">{welcome.heading}</h2>
            </Reveal>

            <div className="space-y-6">
              {welcome.body.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className={i === 0 ? "lede" : "body-copy"}>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {welcome.roles.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-line px-4 py-1.5 text-[0.78rem] text-dim"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {welcome.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-bone sm:text-3xl">{s.value}</p>
                    <p className="mt-1.5 text-[0.7rem] uppercase leading-tight tracking-[0.14em] text-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
