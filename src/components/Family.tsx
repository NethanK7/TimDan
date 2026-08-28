"use client";

import Image from "next/image";
import { family } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export default function Family() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">{family.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mb-7 max-w-[16ch]">{family.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-copy max-w-[48ch]">{family.body}</p>
            </Reveal>
          </div>

          {/* the painting arrives already framed — let it sit like a picture
              on a wall rather than cropping it into a card */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <figure className="mx-auto max-w-[400px]">
                <Image
                  src="/images/family.jpg"
                  alt="A painted portrait of Timothy and his wife Viji"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="h-auto w-full rounded-sm shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
                />
                <figcaption className="mt-5 text-center text-[0.72rem] uppercase tracking-[0.2em] text-muted">
                  {family.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
