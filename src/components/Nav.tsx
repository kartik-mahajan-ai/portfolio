"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiFileText, FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import CompanyLogo from "./CompanyLogo";
import { roles, sections, site } from "@/data/site";

const FOCUSABLE = "a[href], button:not([disabled])";

export default function Nav() {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentRole = roles.find((r) => r.current) ?? roles[0];

  /* ── Scroll spy ───────────────────────────────────────────── */
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 120) setActiveId("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── Drawer: scroll lock, Escape, focus trap ──────────────── */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setOpen(false);
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    },
    [reduce]
  );

  /* ── Identity block ───────────────────────────────────────── */
  const identity = (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        setOpen(false);
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="group flex items-center gap-3"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line ring-2 ring-accent/0 transition-all duration-300 group-hover:ring-accent/40">
        <Image
          src="/images/profile-square.webp"
          alt=""
          fill
          sizes="44px"
          className="object-cover"
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline gap-1 font-heading text-lg font-semibold tracking-tight">
          {site.name}
        </span>
        <span className="mt-0.5 block font-mono text-[0.7rem] text-fg-subtle">{site.role}</span>
      </span>
    </a>
  );

  /* ── Nav links with a progress rail ───────────────────────── */
  const links = (
    <ul className="relative flex flex-col gap-0.5">
      {/* Continuous rail the active marker slides along */}
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-[0.3rem] top-1 w-px bg-line"
      />
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <li key={s.id} className="relative">
            <a
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              aria-current={isActive ? "true" : undefined}
              className={`group relative flex items-center gap-3 rounded-lg py-2.5 pl-6 pr-3 text-[0.95rem] transition-colors ${
                isActive ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {isActive && !reduce && (
                <motion.span
                  layoutId="nav-marker"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute bottom-1.5 left-[0.3rem] top-1.5 w-px bg-accent shadow-[0_0_8px_var(--accent-ring)]"
                />
              )}
              {isActive && reduce && (
                <span className="absolute bottom-1.5 left-[0.3rem] top-1.5 w-px bg-accent" />
              )}

              <span
                className={`font-mono text-[0.7rem] tabular-nums transition-colors ${
                  isActive ? "text-accent" : "text-fg-subtle/70 group-hover:text-accent/70"
                }`}
              >
                {s.index}
              </span>
              <span className="flex-1">{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  /* ── Currently-at card ────────────────────────────────────── */
  const currently = currentRole && (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="mb-2.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-fg-subtle">
        Currently
      </p>
      <div className="flex items-center gap-2.5">
        <CompanyLogo name={currentRole.company} src={currentRole.logo} className="h-9 w-9" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-tight">{currentRole.company}</p>
          <p className="mt-0.5 truncate font-mono text-[0.65rem] text-fg-subtle">
            {currentRole.title}
          </p>
        </div>
      </div>
    </div>
  );

  /* ── Footer actions ───────────────────────────────────────── */
  const actions = (
    <div className="flex items-center gap-2">
      <a
        href={site.socials.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on GitHub`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      >
        <FiGithub className="h-4 w-4" />
      </a>
      <a
        href={site.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on LinkedIn`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      >
        <FiLinkedin className="h-4 w-4" />
      </a>
      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open résumé (PDF)"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
      >
        <FiFileText className="h-4 w-4" />
      </a>
      <ThemeToggle className="ml-auto" />
    </div>
  );

  const mobileWordmark = (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        setOpen(false);
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="group inline-flex items-baseline gap-1 font-heading text-xl font-semibold tracking-tight"
    >
      {site.shortName}
      <span className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
        .
      </span>
    </a>
  );

  return (
    <>
      {/* ── Desktop rail ─────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-[120] hidden w-[276px] flex-col border-r border-line bg-bg/60 px-6 py-8 backdrop-blur-xl lg:flex">
        {identity}

        <nav aria-label="Sections" className="mt-10">
          {links}
        </nav>

        <div className="mt-auto space-y-4 pt-8">
          {currently}
          {actions}
          <p className="font-mono text-[0.65rem] text-fg-subtle">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </aside>

      {/* ── Mobile bar ───────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-[120] flex h-16 items-center justify-between border-b border-line bg-bg/80 px-5 backdrop-blur-xl lg:hidden">
        {mobileWordmark}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-accent"
          >
            <FiMenu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[140] flex w-[min(21rem,88vw)] flex-col overflow-y-auto border-l border-line bg-bg-elev px-6 py-7 lg:hidden"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                {identity}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:text-accent"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <nav aria-label="Sections" className="mt-8">
                {links}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                {currently}
                {actions}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
