"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Trailing ring cursor. `.fine-only` keeps it off touch devices. */
export default function Cursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest?.("a, button, [data-cursor]")));
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="fine-only pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-white/70"
        animate={{
          width: active ? 46 : 22,
          height: active ? 46 : 22,
          x: active ? -23 : -11,
          y: active ? -23 : -11,
          opacity: active ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
    </motion.div>
  );
}
