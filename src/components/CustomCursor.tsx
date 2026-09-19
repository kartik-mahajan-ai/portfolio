"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Only mounts for visitors on a precise pointer (mouse/trackpad) who have not
 * asked for reduced motion. Touch and keyboard users keep the native cursor —
 * the old build hid it globally via `* { cursor: none }`.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { damping: 26, stiffness: 300, mass: 0.45 });
  const ringY = useSpring(y, { damping: 26, stiffness: 300, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allowed = fine.matches && !calm.matches;

    setEnabled(allowed);
    if (!allowed) return;

    // Hide the native cursor only once we know we're replacing it.
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      setActive(!!el?.closest?.("a, button, [role='button'], input, textarea, select"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <style>{`.has-custom-cursor, .has-custom-cursor * { cursor: none !important; }`}</style>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[190] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[189] rounded-full border border-accent/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          backgroundColor: active ? "var(--accent-soft)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
    </>
  );
}
