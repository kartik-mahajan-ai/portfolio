import { FiArrowUpRight, FiAward } from "react-icons/fi";
import Section from "./Section";
import { Stagger, StaggerItem } from "./motion";
import { certifications } from "@/data/site";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications">
      <Stagger as="ul" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {certifications.map((cert) => {
          const inner = (
            <>
              <FiAward className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-snug text-fg">
                  {cert.title}
                </span>
                <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                  {cert.issuer}
                </span>
              </span>
              {cert.url && (
                <FiArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              )}
            </>
          );

          return (
            <StaggerItem as="li" key={cert.title}>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full items-start gap-3 p-4 transition-colors hover:border-accent/50"
                >
                  {inner}
                </a>
              ) : (
                <div className="card group flex h-full items-start gap-3 p-4 transition-colors hover:border-line-strong">
                  {inner}
                </div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
