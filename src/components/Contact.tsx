"use client";

import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
} from "react-icons/fi";
import Section from "./Section";
import { Reveal } from "./motion";
import { site } from "@/data/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** Without all three keys the form can only fail, so we show mail links instead. */
const formEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  const field =
    "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (company) return; // bot filled the hidden field
    setStatus("sending");

    try {
      const emailjs = (await import("emailjs-com")).default;
      await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, { ...form }, PUBLIC_KEY!);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-fg-muted">
              Always happy to talk about AI/ML, a problem you&apos;re stuck on, or something worth
              building together. If you&apos;re working on something interesting, my inbox is open.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-xl border border-line">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
              >
                <FiMail className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                    Email
                  </span>
                  <span className="block truncate text-sm text-fg">{site.email}</span>
                </span>
                <FiArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
              >
                <FiGithub className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                    GitHub
                  </span>
                  <span className="block truncate text-sm text-fg">Code &amp; experiments</span>
                </span>
                <FiArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
              >
                <FiLinkedin className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                    LinkedIn
                  </span>
                  <span className="block truncate text-sm text-fg">Background &amp; updates</span>
                </span>
                <FiArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {formEnabled ? (
            <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
              {/* Hidden from people, tempting to bots. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-[0.7rem] uppercase tracking-wider text-fg-subtle">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-none`}
                  placeholder="What are you working on?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
              >
                {status === "sent" ? (
                  <>
                    <FiCheck className="h-4 w-4" /> Message sent
                  </>
                ) : status === "sending" ? (
                  "Sending…"
                ) : (
                  <>
                    <FiSend className="h-4 w-4" /> Send message
                  </>
                )}
              </button>

              {/* Announced to screen readers as it changes. */}
              <p aria-live="polite" className="min-h-5 text-center text-sm">
                {status === "sent" && (
                  <span className="text-accent">Thanks — I&apos;ll get back to you soon.</span>
                )}
                {status === "error" && (
                  <span className="text-red-500">
                    Something went wrong.{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      Email me directly
                    </a>
                    .
                  </span>
                )}
              </p>
            </form>
          ) : (
            <div className="card flex flex-col items-start gap-5 p-8">
              <h3 className="font-heading text-xl font-semibold">Send me a message</h3>
              <p className="leading-relaxed text-fg-muted">
                The quickest way to reach me is straight to my inbox — I read everything.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                <FiMail className="h-4 w-4" />
                {site.email}
              </a>
              <p className="font-mono text-[0.7rem] leading-relaxed text-fg-subtle">
                Want the contact form live instead? Add your EmailJS keys to{" "}
                <code className="text-accent">.env.local</code> — see{" "}
                <code className="text-accent">.env.example</code>.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
