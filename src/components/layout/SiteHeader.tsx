"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Clicking the link for the page you're already on doesn't navigate, so scroll back to the top.
  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-grey-900 bg-brand-black shadow-lg shadow-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        {/* min-h keeps the header bar the same height now that the trimmed logo is shorter. */}
        <Link href="/" className="flex min-h-11 shrink-0 items-center" onClick={() => handleNavClick("/")}>
          <Image
            src={site.meta.logoDarkTrimmed}
            alt={site.meta.name}
            // Intrinsic size matches the rendered sm:h-6 so the srcset stays logo-sized, not 1920px.
            width={176}
            height={24}
            className="h-5 w-auto sm:h-6"
            loading="eager"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-semibold uppercase tracking-wide text-brand-white transition-colors hover:text-brand-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            href={site.donateCta.href}
            className="shrink-0 whitespace-nowrap px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {site.donateCta.label}
          </Button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center text-brand-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-brand-grey-900 px-6 py-2 lg:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="border-b border-brand-grey-900 py-3 text-sm font-semibold uppercase tracking-wide text-brand-white last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
