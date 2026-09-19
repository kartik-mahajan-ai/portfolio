import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import Section from "./Section";
import CompanyLogo from "./CompanyLogo";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { roles } from "@/data/site";

export default function Experience() {
  return (
    <Section id="experience">
      <div className="flex flex-col gap-5">
        {roles.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.08}>
            <article className="card group relative overflow-hidden p-6 transition-colors hover:border-accent/40 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent-soft via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              {/* Accent edge that draws in on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-accent to-transparent transition-transform duration-500 group-hover:scale-y-100"
              />

              <div className="flex flex-wrap items-start gap-4 sm:gap-5">
                <CompanyLogo name={role.company} src={role.logo} className="h-14 w-14" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                      {role.url ? (
                        <a
                          href={role.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                        >
                          {role.company}
                          <FiArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover/link:opacity-100" />
                        </a>
                      ) : (
                        role.company
                      )}
                    </h3>

                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-lg text-fg">{role.title}</p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-fg-subtle">
                    <span className="text-accent">{role.period}</span>
                    {role.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <FiMapPin className="h-3 w-3" />
                        {role.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-7 max-w-2xl leading-relaxed text-fg-muted">{role.summary}</p>

              <Stagger as="ul" className="mt-5 space-y-3">
                {role.points.map((point) => (
                  <StaggerItem as="li" key={point} className="flex gap-3 text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
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
