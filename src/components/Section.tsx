import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { sectionOf } from "@/data/site";

type Props = {
  id: string;
  children: ReactNode;
};

/**
 * Standard wrapper for every content section. Index, label and heading all
 * come from `sections` in the data file, so a component never hardcodes them.
 *
 * `min-h-svh` guarantees a section fills the viewport even when its content is
 * short, so the next section can't bleed into view underneath it. Taller
 * content simply grows past it (min-height, not height).
 */
export default function Section({ id, children }: Props) {
  const { index, label, lead } = sectionOf(id);

  return (
    <section
      id={id}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center border-t border-line pb-24 pt-12 lg:min-h-svh lg:pb-28 lg:pt-14"
    >
      {/* Accent tick where the section rule begins */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-accent to-transparent"
      />

      <Reveal className="mb-10 md:mb-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums tracking-[0.2em] text-accent">
            {index}
          </span>
          <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            {label}
          </span>
        </div>
        {lead && (
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
            {lead}
          </h2>
        )}
      </Reveal>

      {children}
    </section>
  );
}
