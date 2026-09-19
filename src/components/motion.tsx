"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Expo-out. Fast to start, long soft landing — reads as deliberate, not bouncy. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────────────────
   Reveal — single element entrance
   ─────────────────────────────────────────────────────────── */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
};

export function Reveal({ children, delay = 0, y = 20, className, as }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = (as ?? motion.div) as typeof motion.div;

  if (reduce) {
    const Plain = (as ?? "div") as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────────
   Stagger — parent/child choreography
   Children animate in sequence instead of all at once.
   ─────────────────────────────────────────────────────────── */

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({
  children,
  className,
  as,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Plain = (as ?? "div") as ElementType;

  if (reduce) return <Plain className={className}>{children}</Plain>;

  const Tag = motion[as ?? "div"];

  return (
    <Tag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Plain = (as ?? "div") as ElementType;

  if (reduce) return <Plain className={className}>{children}</Plain>;

  const Tag = motion[as ?? "div"];
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────────
   MaskReveal — type slides up from behind its own edge
   ─────────────────────────────────────────────────────────── */

export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ───────────────────────────────────────────────────────────
   CountUp — animates a stat to its value when scrolled into view
   Keeps any non-numeric decoration ("100+", "9.0").
   ─────────────────────────────────────────────────────────── */

export function CountUp({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^(\D*)([\d.]+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = match?.[2];
  const suffix = match?.[3] ?? "";
  const decimals = numeric?.includes(".") ? numeric.split(".")[1].length : 0;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (inView && numeric) mv.set(parseFloat(numeric));
  }, [inView, numeric, mv]);

  useEffect(() => {
    if (!numeric) return;
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals);
    });
  }, [spring, decimals, numeric]);

  // Non-numeric values, or reduced motion, render as-is.
  if (!numeric || reduce) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* ───────────────────────────────────────────────────────────
   Magnetic — button drifts toward the cursor
   ─────────────────────────────────────────────────────────── */

export function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  if (reduce) return <>{children}</>;

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
