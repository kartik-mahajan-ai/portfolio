import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import Section from "./Section";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { education, site } from "@/data/site";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-16">
        <div className="order-2 space-y-6 text-lg leading-relaxed text-fg-muted lg:order-1">
          <Reveal>
            <p>
              I&apos;m a third-year B.Tech student at{" "}
              <span className="font-medium text-fg">Bennett University</span>, specialising in
              Artificial Intelligence with a 9.0 CGPA, and currently a{" "}
              <span className="font-medium text-fg">Data Science Intern at Blitz AI</span>.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p>
              Most of my work sits where machine learning meets something a person actually has to
              use. That means caring about the parts that usually get skipped: whether a
              prediction can be explained, whether the interface makes its confidence legible, and
              whether the whole thing survives contact with real data. My healthcare projects lean
              on explainability for exactly that reason.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p>
              Alongside that I keep a steady competitive-programming habit — 100+ DSA problems
              solved — and work across Python, Java and TypeScript, training models one week and
              shipping the interface around them the next.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-xs text-fg-subtle">
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="h-3.5 w-3.5 text-accent" />
                {site.location}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="group relative mx-auto w-[240px] sm:w-[300px] lg:mt-2">
            {/* Concentric rings echo the circle instead of boxing it in. */}
            <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-line" />
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full border border-line/50"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            />

            <div className="relative aspect-square overflow-hidden rounded-full border border-line bg-surface-2">
              <Image
                src="/images/profile-square.webp"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(max-width: 640px) 240px, 300px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                priority
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Education ─────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <h3 className="mb-5 mt-16 font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
          Education
        </h3>
      </Reveal>

      <div className="space-y-4">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.06}>
            <article className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-heading text-lg font-semibold">{edu.degree}</h4>
                <span className="font-mono text-xs text-accent">{edu.period}</span>
              </div>

              <p className="mt-2 text-sm text-fg-muted">
                <span className="text-fg">{edu.school}</span>
                <span className="mx-2 text-fg-subtle">·</span>
                {edu.meta}
              </p>

              <Stagger as="ul" className="mt-4 space-y-2.5">
                {edu.points.map((point) => (
                  <StaggerItem as="li" key={point} className="flex gap-3 text-sm text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </StaggerItem>
                ))}
              </Stagger>
            </article>
          </Reveal>
        ))}

      </div>
    </Section>
  );
}
