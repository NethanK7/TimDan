"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(skip);
    }

    document.body.style.overflow = "hidden";

    // Ease the counter toward 100 rather than stepping linearly
    const tick = window.setInterval(() => {
      setProgress((p) => {
        const next = p + Math.max(1, (100 - p) * 0.09);
        return next >= 99.4 ? 100 : next;
      });
    }, 34);

    return () => {
      window.clearInterval(tick);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 420);
    return () => window.clearTimeout(t);
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            <p className="eyebrow mb-5">Colombo · Sri Lanka</p>
            <p className="display-lg gold-text">Timothy Daniel</p>
          </motion.div>

          <div className="mt-12 h-px w-[min(420px,62vw)] overflow-hidden bg-line">
            <motion.div
              className="h-full bg-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <p className="mt-4 font-display text-sm tabular-nums text-bone-dim">
            {Math.round(progress)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
