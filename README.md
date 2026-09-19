# Kartik Mahajan — Portfolio

Personal portfolio site. Single scrolling page, fully server-rendered, with a scroll-spy sidebar,
a warm cream/charcoal dual theme and an animated ambient background.

**Next.js 14 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**

---

## Running locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build — also type-checks |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript only |

---

## How it's put together

**All content lives in [`src/data/site.ts`](src/data/site.ts).** Every piece of copy, link, project,
skill, role, date and section heading is in that one file. Components hold layout and styling only —
nothing is hardcoded in JSX.

That file also drives structure, not just text:

- `sections` determines the nav, the scroll order, the `01…06` numbering and each section heading.
  Reorder or remove an entry and the sidebar, scroll-spy and headings all follow.
- `certifications` — the section hides itself entirely while the array is empty.
- `projects` — `github` and `live` are optional. Omit one and its button isn't rendered, rather
  than linking to `#`.
- `roles` — `logo` is a path under `/public`. Omit it and the card falls back to a monogram.

**There is no `tailwind.config.ts`.** Tailwind v4 is configured in CSS, via `@theme inline` in
[`src/app/globals.css`](src/app/globals.css). One accent colour is shared across both themes; only
the neutrals invert. To reskin the whole site, change `--accent` under `:root` and `.dark`.

Use the semantic tokens rather than raw colours:

`bg-bg` · `bg-bg-elev` · `bg-surface` · `bg-surface-2` · `text-fg` · `text-fg-muted` ·
`text-fg-subtle` · `border-line` · `border-line-strong` · `bg-accent` · `text-accent`

---

## Contact form

Uses [EmailJS](https://dashboard.emailjs.com) and needs three public keys:

```bash
cp .env.example .env.local   # then fill in all three
```

If any key is missing, the form is replaced by direct mail links — the section never renders a form
that can't submit. Set the same three variables in your host's dashboard when deploying.

---

## Accessibility

Worth preserving if you edit these areas:

- Every animation goes through `src/components/motion.tsx`, and each helper degrades to a static
  element under `prefers-reduced-motion`.
- The custom cursor only mounts on precise pointers and is skipped under reduced motion — the
  native cursor is never hidden globally.
- The mobile drawer traps focus, closes on `Escape`, locks body scroll and restores focus to its
  trigger.
- Icon-only controls carry `aria-label`; external links carry `rel="noopener noreferrer"`.
- A skip link precedes the nav, and focus is visible throughout.
- Both themes clear WCAG AA for body text and headings.

---

## Deploying

Fully static — all routes prerender. Built for [Vercel](https://vercel.com): import the repo, accept
the detected settings, add the three EmailJS environment variables.

Set `site.url` in `src/data/site.ts` to the real domain before the first deploy — it drives the
canonical URL, `sitemap.xml`, `robots.txt` and the Open Graph tags used in link previews.

---

## Note

Turbopack does not always invalidate CSS. If a style change doesn't show up, stop the dev server,
delete `.next`, and restart.
