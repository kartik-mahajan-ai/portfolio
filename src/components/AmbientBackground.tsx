"use client";

import { useEffect, useRef, useState } from "react";
import { FlowPattern } from "./Doodles";

/**
 * Fixed atmospheric layer behind the whole page:
 *
 *  1. a drifting warm aurora (CSS-only, compositor-bound)
 *  2. a fine grid, faded out toward the edges
 *  3. a spotlight that follows the pointer on desktop
 *
 * The spotlight writes CSS custom properties from a rAF loop rather than
 * setting React state, so pointer movement never triggers a re-render.
 */
export default function AmbientBackground() {
  const spotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.3 });
  const current = useRef({ x: 0.5, y: 0.3 });
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    setSpotlight(true);

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      // Ease toward the pointer so the light lags slightly behind it.
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;

      const el = spotRef.current;
      if (el) {
        el.style.setProperty("--spot-x", `${(current.current.x * 100).toFixed(2)}%`);
        el.style.setProperty("--spot-y", `${(current.current.y * 100).toFixed(2)}%`);
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base wash so the blobs have something to sit on. */}
      <div className="absolute inset-0 bg-bg" />

      {/* Aurora */}
      <div className="absolute left-[-10%] top-[-15%] h-[45rem] w-[45rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_65%)] opacity-[0.16] blur-[90px] aurora-a dark:opacity-[0.22]" />
      <div className="absolute right-[-15%] top-[25%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,#d2703a_0%,transparent_65%)] opacity-[0.12] blur-[100px] aurora-b dark:opacity-[0.18]" />
      <div className="absolute bottom-[-20%] left-[20%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,#b8862f_0%,transparent_65%)] opacity-[0.1] blur-[110px] aurora-c dark:opacity-[0.16]" />

      {/* Grid, faded at the edges so it never meets the viewport hard */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      {/* Pointer spotlight */}
      {spotlight && (
        <div
          ref={spotRef}
          className="absolute inset-0 opacity-70 [background:radial-gradient(28rem_28rem_at_var(--spot-x,50%)_var(--spot-y,30%),var(--accent-soft),transparent_70%)]"
        />
      )}

      {/* Vignette keeps the centre of the page the brightest part */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,var(--bg)_100%)]" />

      {/*
       * Flowing squiggle wallpaper — soft graphite on cream, soft chalk on
       * charcoal.
       *
       * Drawn AFTER the vignette on purpose: the vignette paints solid --bg
       * toward the edges, so anything beneath it there gets painted over.
       *
       * `flow-mask` clears the centre entirely, which is why the reading
       * column stays clean while the edges carry the pattern.
       */}
      <FlowPattern className="absolute inset-0 h-full w-full text-doodle flow-mask" />
    </div>
  );
}
