import Section from "./Section";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { skillGroups } from "@/data/site";

export default function Skills() {
  return (
    <Section id="skills">
      <div className="divide-y divide-line border-y border-line">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <div className="grid gap-4 py-7 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle sm:pt-1">
                {group.title}
              </h3>
              <Stagger as="ul" className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item}
                    className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
