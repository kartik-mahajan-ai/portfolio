import { FiArrowUp } from "react-icons/fi";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-10 sm:flex-row sm:items-center">
      <p className="font-mono text-xs text-fg-subtle">
        © {new Date().getFullYear()} {site.name}
      </p>

      <a
        href="#top"
        className="group inline-flex items-center gap-2 font-mono text-xs text-fg-subtle transition-colors hover:text-accent"
      >
        Back to top
        <FiArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
      </a>
    </footer>
  );
}
