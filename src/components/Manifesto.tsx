import { CompassFigure, Squiggle } from "./Doodles";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { manifesto, sectionOf } from "@/data/site";

/**
 * The statement between the hero and About. Deliberately not built on
 * <Section>: it has no standard heading, and the typographic contrast —
 * bold sans against serif italic — is the whole point of the layout.
 */
export default function Manifesto() {
  const { index, label } = sectionOf("approach");

  return (
    <section
      id="approach"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden border-t border-line pb-24 pt-12 lg:min-h-svh lg:pb-28 lg:pt-14"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-accent to-transparent"
      />

      <Reveal className="mb-10 md:mb-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums tracking-[0.2em] text-accent">
            {index}
          </span>
          <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            {manifesto.kicker || label}
          </span>
        </div>
      </Reveal>

      {/* ── Headline + figure ─────────────────────────────────── */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
        <div>
          <Reveal>
            <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              {manifesto.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-3 font-serif text-[clamp(1.75rem,5vw,3.25rem)] italic leading-[1.15] text-accent">
              {manifesto.emphasis.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Squiggle className="mt-6 h-3 w-32 text-accent/45" />
          </Reveal>
        </div>

        <Reveal delay={0.18} className="hidden lg:block">
          <CompassFigure className="mx-auto h-56 w-56 text-doodle" />
        </Reveal>
      </div>

      {/* ── Principles ────────────────────────────────────────── */}
      <Stagger as="ul" className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
        {manifesto.principles.map((p) => (
          <StaggerItem as="li" key={p.n} className="group relative">
            {/* Outlined numeral, echoing the section indices */}
            <span
              aria-hidden="true"
              className="block font-heading text-5xl font-bold leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--border-strong)] group-hover:[-webkit-text-stroke:1px_var(--accent)]"
            >
              {p.n}
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold">{p.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{p.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
