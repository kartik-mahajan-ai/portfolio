import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">
        The link may be out of date, or the page was moved.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
      >
        <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to the portfolio
      </Link>
    </main>
  );
}
