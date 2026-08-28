"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";
import { Stagger, StaggerItem } from "./ui/Reveal";

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
        <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-line bg-raise">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 bg-raise-2" />
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

/** Grid of short-form drops + a shared lightbox. Used on both the home teaser and the full /truth page. */
export default function TruthGrid({
  videos,
  configured,
  error,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
}: {
  videos: Video[];
  configured: boolean;
  error?: string;
  columns?: string;
}) {
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
      {videos.length > 0 ? (
        <Stagger className={`grid gap-4 ${columns}`}>
          {videos.map((v, i) => (
            <DropCard key={v.id} video={v} index={i} onOpen={setActive} />
          ))}
        </Stagger>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-raise/30 px-8 py-14 text-center">
          <p className="font-display text-xl text-bone">
            {configured ? "No drops came back yet" : "Connect the Tim Drops Truth channel"}
          </p>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-dim">
            {configured
              ? "The channel is connected — short-form uploads under 3 minutes will appear here automatically."
              : "Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID (or YOUTUBE_TRUTH_CHANNEL_ID for a separate channel) and the latest drops will populate this grid automatically."}
          </p>
          {error && (
            <p className="mx-auto mt-5 max-w-[60ch] rounded-lg border border-line bg-ink px-4 py-3 font-mono text-[0.72rem] text-muted">
              {error}
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
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line text-dim transition-colors hover:border-gold/60 hover:text-gold sm:right-8 sm:top-8"
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
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg border border-line bg-black">
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
