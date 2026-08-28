"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";
import { Stagger, StaggerItem } from "./ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function PlayBadge({ big = false }: { big?: boolean }) {
  return (
    <span
      className={`grid place-items-center rounded-full border border-bone/30 bg-ink/55 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold group-hover:bg-gold group-hover:text-ink ${
        big ? "h-20 w-20" : "h-14 w-14"
      }`}
    >
      <svg
        width={big ? 18 : 13}
        height={big ? 21 : 15}
        viewBox="0 0 18 21"
        aria-hidden
        className="ml-1"
      >
        <path d="M0 0 L18 10.5 L0 21 Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function Thumb({ video, featured }: { video: Video; featured?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-line/70 bg-raise ${
        featured ? "aspect-[16/9]" : "aspect-video"
      }`}
    >
      {video.thumbnail ? (
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 bg-raise-2" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <PlayBadge big={featured} />
      </div>
    </div>
  );
}

export default function VideoGrid({
  videos,
  channelUrl,
}: {
  videos: Video[];
  channelUrl?: string;
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

  const [featured, ...rest] = videos;

  return (
    <>
      {featured && (
        <motion.button
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          onClick={() => setActive(featured)}
          className="group mb-5 grid w-full gap-7 text-left lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-8">
            <Thumb video={featured} featured />
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Latest</p>
            <h3 className="h-card mb-4 line-clamp-3">{featured.title}</h3>
            <p className="mb-5 line-clamp-3 text-[0.93rem] leading-[1.7] text-dim">
              {featured.description}
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              {formatDate(featured.publishedAt)}
            </p>
          </div>
        </motion.button>
      )}

      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((v) => (
          <StaggerItem key={v.id}>
            <button
              onClick={() => setActive(v)}
              className="group block w-full text-left"
            >
              <Thumb video={v} />
              <h4 className="mt-4 line-clamp-2 text-[0.98rem] leading-snug text-bone transition-colors duration-300 group-hover:text-gold">
                {v.title}
              </h4>
              <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                {formatDate(v.publishedAt)}
              </p>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      {channelUrl && (
        <div className="mt-12 flex justify-center">
          <a
            href={channelUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm text-dim transition-colors duration-300 hover:border-gold/50 hover:text-gold"
          >
            View the full channel
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
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
              className="w-full max-w-5xl"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-black">
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-bone">{active.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
