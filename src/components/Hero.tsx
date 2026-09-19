import { FiArrowDown, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { CountUp, MaskReveal, Magnetic, Reveal } from "./motion";
import { site, stats } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] items-center py-20 lg:min-h-svh lg:py-24"
    >
      {/* Backdrop comes from <AmbientBackground /> at the layout level. */}
      <div className="w-full">
        <Reveal y={12}>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[0.7rem] tracking-wide text-fg-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Data Science Intern @ Blitz AI
          </p>
        </Reveal>

        {/* Each line slides up from behind its own edge, one after the other. */}
        <h1 className="mt-8 text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
          <MaskReveal delay={0.1}>Kartik</MaskReveal>
          <MaskReveal delay={0.22}>
            <span className="text-gradient">Mahajan.</span>
          </MaskReveal>
        </h1>

        <Reveal delay={0.42} y={12}>
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <p className="font-mono text-sm tracking-wide text-accent">{site.role}</p>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            {site.tagline}{" "}
            <span className="text-fg">
              Deep learning, applied computer vision, and the full stack around them.
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.58}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
              >
                View selected work
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <FiDownload className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Résumé
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.66}>
          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp
                    value={stat.value}
                    className="block font-heading text-2xl font-semibold tabular-nums sm:text-3xl"
                  />
                  <span className="mt-1 block text-xs leading-snug text-fg-subtle">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-fg-subtle transition-colors hover:text-accent lg:block"
      >
        <FiArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
