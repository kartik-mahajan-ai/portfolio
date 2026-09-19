import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Section from "./Section";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { projects } from "@/data/site";

export default function Projects() {
  return (
    <Section id="projects">
      <div className="flex flex-col gap-5">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <article className="card group relative overflow-hidden p-6 transition-colors hover:border-line-strong sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent-soft to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-10">
                <div>
                  {/* Title and blurb share one column so they align exactly,
                      regardless of how wide the index numeral renders. */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                          {project.title}
                        </h3>
                        <span className="font-mono text-xs text-fg-subtle">{project.year}</span>
                      </div>
                      <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">
                        {project.blurb}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl leading-relaxed text-fg-muted">
                    {project.description}
                  </p>

                  <Stagger as="ul" className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <StaggerItem
                        as="li"
                        key={tag}
                        className="rounded-md border border-line px-2.5 py-1 font-mono text-[0.7rem] text-fg-subtle"
                      >
                        {tag}
                      </StaggerItem>
                    ))}
                  </Stagger>

                  {(project.github || project.live) && (
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                        >
                          <FiGithub className="h-4 w-4" />
                          <span>Source</span>
                          <span className="sr-only">for {project.title}</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                        >
                          <span>Live demo</span>
                          <span className="sr-only">of {project.title}</span>
                          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:border-l lg:border-line lg:pl-10">
                  <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-fg-subtle">
                    Highlights
                  </h4>
                  <Stagger as="ul" className="mt-4 space-y-3">
                    {project.highlights.map((highlight) => (
                      <StaggerItem
                        as="li"
                        key={highlight}
                        className="flex gap-3 text-sm text-fg-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
