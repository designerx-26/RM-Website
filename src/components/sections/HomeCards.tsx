import Link from "next/link";
import { site } from "@/content/site";

export function HomeCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.homeCards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group flex flex-col justify-between gap-6 border-t-4 border-brand-red bg-brand-grey-50 p-6 transition-colors hover:bg-brand-white hover:shadow-md dark:bg-brand-grey-900 dark:hover:bg-brand-grey-900/70"
        >
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight text-brand-black dark:text-brand-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-brand-grey-500">{card.description}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-red">
            {card.cta}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
