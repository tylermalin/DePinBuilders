import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { AuthButtons } from "./auth-buttons";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/map", label: "Map" },
  { href: "/tools/roi-calculator", label: "Tools" },
  { href: "/academy", label: "Academy" },
  { href: "/blog", label: "Blog" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/86 backdrop-blur-[14px]">
      <div className="mx-auto flex h-[66px] max-w-[var(--max-w)] items-center gap-[22px] px-7">
        {/* Brand */}
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <svg className="h-[34px] w-[34px]" viewBox="0 0 36 36" fill="none">
            <rect
              x="1.4"
              y="1.4"
              width="33.2"
              height="33.2"
              rx="4"
              stroke="var(--orange)"
              strokeWidth="2"
            />
            <path
              d="M9 25 V14 L18 9 L27 14 V25"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="18" cy="19" r="3.4" fill="var(--orange)" />
            <path d="M9 25 H27" stroke="var(--orange)" strokeWidth="2" />
          </svg>
          <span className="font-display text-xl font-bold tracking-tight">
            DePin<span className="text-orange">.</span>Builders
          </span>
        </Link>

        {/* Primary nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-[3px] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[3px] px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex flex-none items-center gap-2.5">
          <ThemeToggle />
          <AuthButtons />
          <Link href="/get-verified" className="max-sm:hidden">
            <Button variant="fill" size="sm">
              Get Verified
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
