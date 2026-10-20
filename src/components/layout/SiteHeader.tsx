import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-grey-900 bg-brand-black shadow-lg shadow-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src={site.meta.logoDark}
            alt={site.meta.name}
            width={900}
            height={300}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-brand-white transition-colors hover:text-brand-red"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href={site.donateCta.href} className="text-xs sm:text-sm">
          {site.donateCta.label}
        </Button>
      </div>

      <nav className="flex items-center gap-4 overflow-x-auto border-t border-brand-grey-900 px-6 py-2 lg:hidden">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-brand-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
