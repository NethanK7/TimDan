"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Video, VideosPayload } from "@/lib/youtube";
import { truth } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

function PlayGlyph() {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-full border border-bone/30 bg-ink/55 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
      <svg width="11" height="13" viewBox="0 0 11 13" aria-hidden className="ml-0.5">
        <path d="M0 0 L11 6.5 L0 13 Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function DropCard({
  video,
  index,
  onOpen,
}: {
  video: Video;
  index: number;
  onOpen: (video: Video) => void;
}) {
  return (
    <StaggerItem>
      <button onClick={() => onOpen(video)} className="group block w-full text-left">
        <div className="relative aspect-[9/16] overflow-hidden rounded-sm border border-line bg-surface">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 bg-surface-2" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <PlayGlyph />
          </div>
          <span className="absolute right-3 top-3 font-display text-xs text-bone/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-[0.8rem] font-medium leading-snug text-bone">
            {video.title}
          </p>
        </div>
      </button>
    </StaggerItem>
  );
}

export default function TruthPanel({ shorts }: { shorts: VideosPayload }) {
  const [active, setActive] = useState<Video | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

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
            transition={{ delay: i * 0.045, duration: 0.6, ease: EASE }}
            className="rounded-full border border-line bg-surface/50 px-4 py-1.5 text-[0.78rem] text-bone-dim"
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* the drops — short-form videos pulled live from YouTube */}
      {shorts.videos.length > 0 ? (
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {shorts.videos.map((v, i) => (
            <DropCard key={v.id} video={v} index={i} onOpen={setActive} />
          ))}
        </Stagger>
      ) : (
        <div className="rounded-sm border border-dashed border-line bg-surface/30 px-8 py-14 text-center">
          <p className="font-display text-xl text-bone">
            {shorts.configured ? "No drops came back yet" : "Connect the Tim Drops Truth channel"}
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-bone-dim">
            {shorts.configured
              ? "The channel is connected — short-form uploads under 3 minutes will appear here automatically."
              : "Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID (or YOUTUBE_TRUTH_CHANNEL_ID for a separate channel) and the latest drops will populate this grid automatically."}
          </p>
          {shorts.error && (
            <p className="mx-auto mt-5 max-w-[60ch] rounded-sm border border-line bg-ink px-4 py-3 font-mono text-[0.72rem] text-muted">
              {shorts.error}
            </p>
          )}
        </div>
      )}

      {/* ── lightbox ────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Close video"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line text-bone-dim transition-colors hover:border-gold/60 hover:text-gold sm:right-8 sm:top-8"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
                <path d="M1 1 L12 12 M12 1 L1 12" stroke="currentColor" fill="none" />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-full max-w-[420px]"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-sm border border-line bg-black">
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <h3 className="mt-5 font-display text-lg text-bone">{active.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
